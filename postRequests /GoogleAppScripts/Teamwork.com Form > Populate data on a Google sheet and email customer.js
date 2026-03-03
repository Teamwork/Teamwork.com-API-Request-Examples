/*Use Teamwork API in combination with a Form Submitted Webhook payload to populate a Google sheet with Form data submitted.
The customer will receive an email with a summary of the data selected to the email address they provide
API Call: GET /projects/api/v3/tasklists/${taskListId}/tasks.json?orderBy=createdat&orderMode=desc
Form: https://marccashman.teamwork.com/app/projects/{projectId}/forms/{formId}
Linked Sheet: https://docs.google.com/spreadsheets/d/{sheetId}/edit#gid=0
Script deploy URL: {scriptDeployUrl} - this URL is captured after you deploy your script
Webhook Id: 155722 - Project specific
Author: Marc Cashman <marc.cashman@teamwork.com>
Version: 1.1
*/

function doPost(e) {// doPost required to capture webhook and payload
  const ss = SpreadsheetApp.openById('{sheetId}');
  const payloadSheet = ss.getSheetByName('Raw Data');
  const formSheet = ss.getSheetByName('Sorted Data');
  const errorSheet = ss.getSheetByName('Error Logs');

  payloadSheet.appendRow([e.postData.contents]);// Webhook payload added to Raw Data sheet
  const data = JSON.parse(e.postData.contents);
  const lastRow = Math.max(payloadSheet.getLastRow(), 1);
  payloadSheet.insertRowAfter(lastRow);
  try {
    queryFormData(formSheet, data);//Call function queryFormData below to start script
  } catch (err) {
    errorLog(errorSheet, err, e);//Apply error message to Error Log sheet if caught
  }
}

function queryFormData(formSheet, data) {

  const submittedForm = data["formSubmission"];
  const formId = submittedForm["formId"];
  const formSubmitDate = Utilities.formatDate(new Date(), "GMT", "dd/MM/yyyy HH:mm:ss");// Make sure to alter the timezone when required

  dataToCells(formSheet, formSubmitDate, formId, submittedForm);//Call function dataToCells below
}

function dataToCells(formSheet, formSubmitDate, formId, submittedForm) {

  const APIKey = "{userEmailAddress or APIKEY}";// Admin permissions required for full access
  const TeamworkURL = "https://{siteName}.teamwork.com/";// https://apidocs.teamwork.com/guides/teamwork/getting-started-with-the-teamwork-com-api
  const Pass = "{userPassword}";// User Password linked to the userEmailAddress above or xxx if you added your profile APIKey as your APIKEY on line 39
  const taskListId = "{taskListIdHere}";// TaskList Id for the task that will store the tasks created from the form

  const headers = {
    "Authorization": "Basic " + Utilities.base64Encode(APIKey + ':' + Pass)
  };

  const params = {
    "method": "GET",
    'muteHttpExceptions': true,
    "headers": headers
  };

  const taskListUrl = `${TeamworkURL}/projects/api/v3/tasklists/${taskListId}/tasks.json?orderBy=createdat&orderMode=desc`//OrderMode is important to display the latest task first in the payload
  const getTaskList = UrlFetchApp.fetch(taskListUrl, params);
  const getTaskListData = getTaskList.getContentText();
  const getTaskListDataJson = JSON.parse(getTaskListData);
  const jsonParsed = getTaskListDataJson["tasks"];
  const includedParsed = getTaskListDataJson["included"];
  const passedUrl = [formSubmitDate, formId];
  const data = submittedForm["data"];
  var userEmail = '';
  var emailData = `Thanks for filling out our form! Below is a recap of your selections:<br><br>`
  for (const row of data) {
    const id = jsonParsed[0]["id"].toFixed();
    if (row["label"] == "Email" && jsonParsed[0]["description"].includes(row["value"])) {// This is important for task collection because the task Id is not included in Webhook payload
      userEmail = row["value"];
      const taskUrlParsed = "=HYPERLINK(\"" + TeamworkURL + "/app/tasks/" + id + "\",\"" + id + "\")";
      passedUrl.push(taskUrlParsed);
    }
    if (row["label"] == "Code Languages") {
      const languages = row["value"];
      var lang = ""
      for (const language of languages) {
        lang += language + ", ";
      }
      const last = lang.lastIndexOf(", ");
      passedUrl.push(lang.substring(0, last));
      emailData += `<br><b>${row["label"]}:</b> ${lang.substring(0, last)}`
    } else {
      if (row["label"].includes("certificate")) {
        const files = row["value"];
        var count = 0;
        //Iterates through files attached to append file URL in Teamwork
        for (const file of files) {
          const fileName = file["filename"];
          const fileId = jsonParsed[0]["attachments"][count]["id"];
          const fileUrl = "=HYPERLINK(\"" + TeamworkURL + "/app/files/" + fileId + "\",\"" + fileName + "\")";//Change fileName to fileId if name is not required
          passedUrl.push(fileUrl);
          count++
        }
        break;
      }
      passedUrl.push(row["value"]);// All other fields that are not captured in the loops above ie: Name provided on form, status, cert date, comment and favourite module
      emailData += `<br><b>${row["label"]}:</b> ${row["value"]}`
    }
  }
  emailData += `<br><br>If you have any questions, please reply to this email and use the following ref no: ${jsonParsed[0]["id"].toFixed()}<br><br> All the best.<br>Sign-off Name` // Note that the ref no would be the task id - alter this message as you see fit for your process.
  //var recipients = `${userEmail},support@yourcompany.com; // If you want the email to be sent to another person, add them here and make sure you uncomment this section
  MailApp.sendEmail({
    to: `${userEmail}`,//`${recipients}`,
    replyTo: "support@yourcompany.com",// this is not required if you are happy for the replies being sent to the email address linked to the owner of the google Sheet and script
    name: "Form Fields",
    subject: `[${jsonParsed[0]["id"].toFixed()}] - Summary of Form Fields`,
    htmlBody: `${emailData}`,
  });
  // Add data to cells in next row
  formSheet.appendRow(passedUrl); // Push all data collected for the form into a row on the linked sheet
}

function errorLog(errorSheet, err, e) {
  var errorUrl = [];
  errorUrl.push([Utilities.formatDate(new Date(), "GMT", "dd/MM/yyyy HH:mm:ss"), err]);// Make sure to alter the timezone when required
  var len = errorUrl.length;

  errorSheet.insertRows(2, len);

  //paste in the values
  errorSheet.getRange(2, 1, len, 2).setValues(errorUrl);

}
