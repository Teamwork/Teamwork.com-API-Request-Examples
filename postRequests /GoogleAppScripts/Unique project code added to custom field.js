/*
Proof of Concept for creating a unique project code to be applied to a project level custom field named "Project Code"
Concept: When a project is created in app, this will trigger the project.created webhook to start the script. The first 4 letters of the client name will be used and the current projects total for the client will be appended onto the code. ie: Teamwork would be TEAM-1, TEAM-2, etc
There is a section to catch unique client names which may have different departments and in this case the first three letters of the first name and the first letter of the second name will be used. The current project total for the client will be appended onto the project code like above.
Once the Project code is concatenated the project code will be populated into the Project Code custom field on the project. The accompanying Google sheet will be populated with the Teamwork.com project Id (which will be a clickable link), Project name, Project Code and Project count for respective client.
API Calls: 
GET /projects/api/v3/companies/${clientId}.json?getStats=true
PUT /projects/${projectId}.json
Author: Marc Cashman <marc.cashman@teamwork.com>
Version: 1.1
*/

// Sheet > https://docs.google.com/spreadsheets/d/{addYourSheetIdHere}/edit?gid=0#gid=0
// Webhook id in Teamwork.com for reference > {addYourWebhookIdHere}

// Credentials and request header data
const APIKey = "";//username used to log into Teamwork.com - preferably a Site admin so there are no missed timelogs due to permissions
const TeamworkURL = "";//site domain - ie: https://yourSiteName.teamwork.com
const Pass = "xxx";// User password linked to username above to log into Teamwork.com - leave xxx if you are adding your api key as the username
const GoogleSheetId = "addYourSheetIdHere"; // this id can be found in the middle of your Google sheet URL inbetween /d/ and /edit

// Custom field ids - please change this id to match the id on your site for the respective custom fields - refer to https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/get-projects-api-v3-customfields-json
const CodeCfId = 1111; // Project custom field (Text) - Project Code

// Variable initialization
var codeAcronym = "";

var headers = {
  "Authorization": `Basic ${Utilities.base64Encode(APIKey + ':' + Pass)}`
};

var params = {
  "method": "GET",
  'muteHttpExceptions': true,
  "headers": headers
};

function doPost(e) {
  var ss = SpreadsheetApp.openById(GoogleSheetId);
  var sheet = ss.getSheetByName("Raw Data");
  var errorLogSheet = ss.getSheetByName("Error Log");
  sheet.appendRow([e.postData.contents]);
  var data = JSON.parse(e.postData.contents);
  var lastRow = Math.max(sheet.getLastRow(), 1);
  sheet.insertRowAfter(lastRow);
  try {
    projectPayload(data, ss);
  } catch (err) {
    Logger.log("Error written here: " + err);
    Logger.log("Error written here: " + err.toString());
    errorLog(errorLogSheet, err, data["project"]["id"], data["project"]["name"]);
  }
}

function projectPayload(data, ss) {
  var date = Utilities.formatDate(new Date(), "GMT", "dd/MM/yyyy HH:mm:ss");// Change the timezone to your local timezone

  var projectSheet = ss.getSheetByName("Project Codes");
  var errorLogSheet = ss.getSheetByName("Error Log");
  var payloadData = data["project"];
  var projectId = payloadData["id"];
  var projectName = payloadData["name"];
  var clientId = payloadData["companyId"];

  try {
    const clientUrl = `${TeamworkURL}/projects/api/v3/companies/${clientId}.json?getStats=true`;

    const clientResponse = UrlFetchApp.fetch(clientUrl, params);
    const clientJsonData = JSON.parse(clientResponse);
    const clientName = clientJsonData.company.name;
    const projectCount = clientJsonData.company.stats.projectCount;
    if (clientName.includes("clientFirstName")) { // Catch for clients which may have a separate department - IE: "Teamwork Desk" = TEAD1, TEAD2, etc
      const words = clientName.trim().split(" ");
      var firstPart = words[0].substring(0, 3);
      var secondPart = words[1].substring(0, 1); 
      codeAcronym = `${firstPart.toUpperCase()}${secondPart.toUpperCase()}`;
    } else {
      codeAcronym = clientName.substring(0, 4).toUpperCase();
    }
    var projectCode = `${codeAcronym}-${projectCount}`;// Current project count for client appended to the codeAcronym
    Logger.log(projectCode);

    payload = JSON.stringify({
      "project": {
        /* "name": projectName,
         */"customfields": [
          { "customFieldId": CodeCfId, "type": "text-short", "value": `${projectCode}` } // If you are not interested in this custom field, please comment out or remove
        ]
      }
    });

    const teamworkParams = {
      "method": "PUT",
      'muteHttpExceptions': true,
      "headers": headers,
      "payload": payload
    };

    const projectUpdateUrl = `${TeamworkURL}/projects/${projectId}.json`;

    const projectUpdateResponse = UrlFetchApp.fetch(projectUpdateUrl, teamworkParams);

    var projectValues = [];
    var projectUrl = `${TeamworkURL}/app/projects/${projectId}/tasks/list`;

    var projectUrlParsed = `=HYPERLINK(\"${projectUrl}","${projectId}")`;

    projectValues.push(
      [
        date,
        projectUrlParsed,
        projectName,
        projectCode,
        clientName,
        projectCount
      ]
    )

    projectSheet.getRange(projectSheet.getLastRow() + 1, 1, projectValues.length, projectValues[0].length).setValues(projectValues);
    console.log(`Print: ${projectCode} for ${projectName}`);
  } catch (err) {
    Logger.log("Error written here: " + err);
    Logger.log("Error written here: " + err.toString());
    errorLog(errorLogSheet, err, data["project"]["id"], data["project"]["name"]);
  }
}

function errorLog(errorLogSheet, err, projectId, email) {
  var projectUrl = `${TeamworkURL}/app/projects/${projectId}/tasks/list`;
  var projectUrlParsed = `=HYPERLINK(\"${projectUrl}","${projectId}")`;
  var errorUrl = [];
  errorUrl.push([Utilities.formatDate(new Date(), "GMT", "dd/MM/yyyy HH:mm:ss"), err, projectUrlParsed, email]);
  var len = errorUrl.length;

  errorLogSheet.insertRows(2, len);

  //paste in the values
  errorLogSheet.getRange(2, 1, len, 4).setValues(errorUrl);
}

