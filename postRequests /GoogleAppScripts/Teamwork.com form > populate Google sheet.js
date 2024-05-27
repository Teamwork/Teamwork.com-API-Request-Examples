/*
Use Teamwork API in combination with a Form Submitted Webhook payload to populate a Google sheet with Form data submitted
API Call: GET /projects/api/v3/tasklists/" + taskListId + "/tasks.json // https://apidocs.teamwork.com/docs/teamwork/v3/tasks/get-projects-api-v3-tasks-task-id-json
Author: Marc Cashman <marc.cashman@teamwork.com>
Version: 1.1
*/

function doPost(e) {// doPost required to capture webhook and payload
    //{full google workbook URL pasted here for ease of access later}
    //{Form URL here for ease of access later}
    const ss = SpreadsheetApp.openById('{sheetId}');
    const payloadSheet = ss.getSheetByName('Raw Data');
    const formSheet = ss.getSheetByName('Sorted Data');
    const errorSheet = ss.getSheetByName('Error Log');

    payloadSheet.appendRow([e.postData.contents]);// Webhook payload added to Raw Data sheet
    const data = JSON.parse(e.postData.contents);
    const lastRow = Math.max(payloadSheet.getLastRow(), 1);
    payloadSheet.insertRowAfter(lastRow);
    try {
        queryFormData(formSheet, data);//Call function queryFormData below to start script
    } catch (err) {
        errorLog(errorSheet, err, e);//Apply error message to Error Log sheet if cought
    }
}

function queryFormData(formSheet, data) {

    const submittedForm = data["formSubmission"];
    const formId = submittedForm["formId"];
    const formSubmitDate = Utilities.formatDate(new Date(), "EDT", "MM/dd/yyyy HH:mm:ss");//Make sure to alter the timezone when required

    dataToCells(formSheet, formSubmitDate, formId, submittedForm);//Call function dataToCells below
}

function dataToCells(formSheet, formSubmitDate, formId, submittedForm) {
    const APIKey = "{userEmailAddress}";// Admin permissions required for full access
    const TeamworkURL = "https://{siteName}.teamwork.com/";// https://apidocs.teamwork.com/guides/teamwork/getting-started-with-the-teamwork-com-api
    const Pass = "{userPassword}";// User Password linked to the userEmailAddress above

    const headers = {
        "Authorization": "Basic " + Utilities.base64Encode(APIKey + ':' + Pass)
    };

    const params = {
        "method": "GET",
        'muteHttpExceptions': true,
        "headers": headers
    };
    const taskListId = "{taskListId}";// TaskList Id for the task that will store the tasks created from the form
    const taskListUrl = TeamworkURL + "/projects/api/v3/tasklists/" + taskListId + "/tasks.json?orderBy=createdat&orderMode=desc"//OrderMode is important to display the latest task first in the payload
    const getTaskList = UrlFetchApp.fetch(taskListUrl, params);
    const getTaskListData = getTaskList.getContentText();
    const getTaskListDataJson = JSON.parse(getTaskListData);
    const jsonParsed = getTaskListDataJson["tasks"];
    const includedParsed = getTaskListDataJson["included"];
    const passedUrl = [formSubmitDate, formId];
    const data = submittedForm["data"];

    for (const row of data) {
        const id = jsonParsed[0]["id"].toFixed();
        if (row["label"] == "Email" && jsonParsed[0]["description"].includes(row["value"])) {// This is important for task collection because the task Id is not included in Webhook payload
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
                //var downloadFileUrl = "=HYPERLINK(\"" + includedParsed["files"][fileId]["downloadURL"]+ "\")";
                //var previewFileUrl = "=HYPERLINK(\"" + includedParsed["files"][fileId]["previewURL"]+ "\")";
                //passedUrl.push(downloadFileUrl);
                break;
            }
            passedUrl.push(row["value"]);
        }
    }

    // Add data to cells in next row
    formSheet.appendRow(passedUrl);

}

function errorLog(errorSheet, err, e) {
    var errorUrl = [];
    errorUrl.push([Utilities.formatDate(new Date(), "EDT", "MM/dd/yyyy HH:mm:ss"), err]);//Make sure to alter the timezone when required
    var len = errorUrl.length;

    errorSheet.insertRows(2, len);

    //paste in the values
    errorSheet.getRange(2, 1, len, 2).setValues(errorUrl);

}
