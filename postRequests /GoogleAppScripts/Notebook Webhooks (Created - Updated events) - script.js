// This script will capture and store all payloads from the Notebook.created and Notebokk.updated webhook events
// Basic data about the notebooks will be populated on a sheet
// No credentials required for this script scenario because there are no API requests
//Script: https://script.google.com/macros/s/{scriptIdHere}/exec
//Sheet: https://docs.google.com/spreadsheets/d/18x_LIJrWfMkVbKKWO9vnyVnelJ9oSR7e1HdiJBm8T5Y/edit?gid=0#gid=0

const GoogleSheetId = "addYourSheetIdHere"; // this id can be found in the middle of your Google sheet URL inbetween /d/ and /edit
const TeamworkURL = "";//site domain - ie: https://yourSiteName.teamwork.com

function doPost(e) {
  const ss = SpreadsheetApp.openById(GoogleSheetId);
  const payloadSheet = ss.getSheets()[0];
  const dataSheet = ss.getSheets()[1];
  const errorLogSheet = ss.getSheets()[2];
  payloadSheet.appendRow([e.postData.contents]);
  const lastRow = Math.max(payloadSheet.getLastRow(), 1);
  payloadSheet.insertRowAfter(lastRow);
  const data = JSON.parse(e.postData.contents);
  const webhookDate = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy HH:mm:ss");

  try {
    notebookPayload(data, dataSheet, ss);
  } catch (err) {
    errorLog(errorLogSheet, err, data["notebook"]);
  }
}

function notebookPayload(data, dataSheet, ss) {
  var notebookData = data["notebook"];
  var notebookId = notebookData["id"];
  var notebookName = notebookData["name"];
  var notebookUrl = TeamworkURL + "/app/notebooks/" + notebookId;
  var notebookUrlParsed = "=HYPERLINK(\"" + notebookUrl + "\",\"" + notebookName + "\")";
  var notebookVersion = notebookData["version"];
  var notebookVersionId = notebookData["versionId"];
  var createdDate = notebookData["dateCreated"];
  var projectId = notebookData["projectId"];
  var projectUrl = TeamworkURL + "/app/projects/" + projectId + "/notebooks";
  var projectUrlParsed = "=HYPERLINK(\"" + projectUrl + "\",\"" + projectId + "\")";
  var projectCreator = data["eventCreator"]["firstName"] + " " + data["eventCreator"]["lastName"];
  var projectCreatorId = data["eventCreator"]["id"];
  var chatUrl = `https://humanise.teamwork.com/chat/people/${projectCreatorId}`;
  var chatUrlParsed = `=HYPERLINK(\"${chatUrl}","${projectCreator}")`;
  notebookDataSheet(dataSheet, projectUrlParsed, notebookId, notebookUrlParsed, notebookVersion, notebookVersionId, createdDate, chatUrlParsed);
}

function notebookDataSheet(dataSheet, projectUrlParsed, notebookId, notebookUrlParsed, notebookVersion, notebookVersionId, createdDate, chatUrlParsed) {
  var notebookDataUrl = [];
  notebookDataUrl.push([Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy HH:mm:ss"), chatUrlParsed, projectUrlParsed, notebookId, notebookUrlParsed, notebookVersion, notebookVersionId, Utilities.formatDate(new Date(createdDate), "GMT+1", "dd/MM/yyyy HH:mm:ss")]);
  var len = notebookDataUrl.length;

  dataSheet.insertRows(2, len);

  //paste in the values
  dataSheet.getRange(2, 1, len, 8).setValues(notebookDataUrl);

}

function errorLog(errorLogSheet, err, data2) {
  var errorUrl = [];
  errorUrl.push([Utilities.formatDate(new Date(), "GMT+1", "MM/dd/yyyy HH:mm:ss"), err, data2]);
  var len = errorUrl.length;

  errorLogSheet.insertRows(2, len);

  //paste in the values
  errorLogSheet.getRange(2, 1, len, 3).setValues(errorUrl);

}
