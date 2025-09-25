/*
Proof of Concept to create a report of time logs with billable rate information attached. 
The script captures the values set on the setting page which includes filters for:
Page Size, Start Date, End Date, Project Id's (comma separated list), User Id's (comma separated list), Include Archive Projects, Include Completed Tasks, Include time entry users timezone preference

Teamwork.com API Calls: 
GET /projects/api/v3/time.json
    /timezones.json

Author: Marc Cashman <marc.cashman@teamwork.com>
Version: 1.1
*/

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('Pull Report');
  menu.addItem('Get time Report', 'getTimeEntriesWithDetails');
  menu.addToUi();
}
// Credentials and request header data
const APIKey = "";//username used to log into Teamwork.com - preferably a Site admin so there are no missed timelogs due to permissions
const Pass = "xxx";// User password linked to username above to log into Teamwork.com - leave xxx if you are adding your api key as the username
const GoogleSheetId = "addYourSheetIdHere"; // this id can be found in the middle of your Google sheet URL inbetween /d/ and /edit
const TeamworkURL = "";//site domain - ie: https://yourSiteName.teamwork.com

var page = 1
var setValues = true;

var values = [];

var headers = {
  "Authorization": `Basic ${Utilities.base64Encode(APIKey + ':' + Pass)}`
};

var params = {
  "method": "GET",
  'muteHttpExceptions': true,
  "headers": headers
};

function getTimeEntriesWithDetails() {
  var ss = SpreadsheetApp.openById(GoogleSheetId);
  var settingsSheet = ss.getSheetByName('Settings');
  var reportSheet = ss.getSheetByName("Time Report");
  var timezone = ss.getSpreadsheetTimeZone();
  const allTimezones = requestTimezones();
  const pageSize = settingsSheet.getRange("B2").getValue();
  const fromDate = Utilities.formatDate(new Date(settingsSheet.getRange("B3").getValue()), "GMT", "yyyy-MM-dd"); // Capture start date for timelogs search
  const toDate = Utilities.formatDate(new Date(settingsSheet.getRange("B4").getValue()), "GMT", "yyyy-MM-dd"); // Capture end date for timelogs search
  const projectIds = settingsSheet.getRange("B5").getValue(); // Filter by a project, group of projects or all projects
  const userIds = settingsSheet.getRange("B6").getValue(); // Filter by a user, group of userss or all users
  const includeArchivedProjects = settingsSheet.getRange("B7").getValue(); // Capture if archived projects are to be included or not
  const includeTimezoneData = settingsSheet.getRange("B9").getValue(); // Capture if archived projects are to be included or not

  reportSheet.clear();
  var header = [["Time entry as stored in DB (UTC Timezone)", "User", "Project", "Client", "Time duration (h:m)", "Billable Rate", "Billable Value", "Time entry based on time entry users timezone preference",	"Time entry User's Time Zone"]];
  var range = reportSheet.getRange(reportSheet.getLastRow() + 1, 1, header.length, header[0].length);
  range.setValues(header);
  reportSheet.setFrozenRows(1);
  reportSheet.getRange("A2:A").setHorizontalAlignment("right");
  reportSheet.getRange("E2:E").setHorizontalAlignment("right");
  do {
    var url = `${TeamworkURL}/projects/api/v3/time.json?include=users,tags,tasks,projects,projects.companies&includeArchivedProjects=${includeArchivedProjects}&returnCostInfo=true&returnBillableInfo=true&skipCounts=true&startDate=${fromDate}&endDate=${toDate}&projectIds=${projectIds}&user&assignedToUserIds=${userIds}&pageSize=${pageSize}&page=${page}`;

    var response = UrlFetchApp.fetch(url, params);
    var json = JSON.parse(response.getContentText());
    var hasMore = json.meta.page.hasMore;
    console.log(json.meta.page.count);
    if (json.meta.page.count == 0) {
      hasMore = false;
      setValues = false;
    } else {
    var timeEntries = json["timelogs"] || [];
    var includedData = json["included"] || [];
    var billableRate = 0;
    var billabletotal = 0;
    var rows = 2
    for (var i = 0; i < timeEntries.length; i++) {
      var entry = timeEntries[i];
      var date = entry.timeLogged;
      var localTime = Utilities.formatDate(new Date(date), timezone, "MM/dd/yyyy HH:mm:ss");
      var userId = entry.userId;
      var projectId = entry.projectId;
      var companyId = includedData.projects[`${projectId}`].company.id;
      Logger.log("User: " + entry.userId);

      var firstName = entry.userId ? includedData.users[`${userId}`].firstName : "N/A";
      var lastName = entry.userId ? includedData.users[`${userId}`].lastName : "N/A";
      var userName = `${firstName} ${lastName}`;
      var timezone = includedData.users[`${userId}`].timezone.toString();
      var timezoneDiff = getUserTimeZone(allTimezones, timezone);
      var projectName = entry.projectId ? includedData.projects[`${projectId}`].name : "N/A";
      var companyName = includedData.projects[`${projectId}`].company.id ? includedData.companies[`${companyId}`].name : "N/A";
      var time = entry.minutes != null ? entry.minutes : "N/A";
      if (entry.hasOwnProperty("billableInfo")) {
      billableRate = entry.billableInfo.rate != null ? entry.billableInfo.rate : "N/A";
      billabletotal = entry.billableInfo.total != null ? entry.billableInfo.total : "N/A";
      } 
      var projectUrl = `${TeamworkURL}/app/projects/${projectId}/time`;
      var projectUrlParsed = `=HYPERLINK("${projectUrl}","${projectName}")`;

      var clientUrl = `${TeamworkURL}/app/clients/${companyId}/overview`;
      var clientUrlParsed = `=HYPERLINK("${clientUrl}","${companyName}")`;

      var hours = Math.floor(time / 60);
      var minutes = time % 60;

      Logger.log("Date: " + localTime);
      Logger.log("User: " + userName);
      Logger.log("Project: " + projectName);
      Logger.log("Company: " + companyName);
      Logger.log("Time (h:m): " + `${hours}:${minutes}`);
      Logger.log("Billable Rate: " + billableRate);
      Logger.log("Billable Total: " + billabletotal);
      Logger.log("-----");

      var values = [];
      if (includeTimezoneData == "true") {
        values.push(
        [
          localTime,
          userName,
          projectUrlParsed,
          clientUrlParsed,
          `${hours}h : ${minutes}m`,
          billableRate,
          billabletotal,
          "=A" + (rows) + timezoneDiff,
            timezone,
        ]
      );
      } else{
      values.push(
        [
          localTime,
          userName,
          projectUrlParsed,
          clientUrlParsed,
          `${hours}h : ${minutes}m`,
          billableRate,
          billabletotal/* ,
      time */
        ]
      );
      }
      reportSheet.getRange(reportSheet.getLastRow() + 1, 1, values.length, values[0].length).setValues(values);
      rows++
    }
    page++;
    }
  } while (hasMore)
  Logger.log(setValues)
  if (!setValues) {
    alertMessage();
  }
}

function alertMessage() {
  SpreadsheetApp.getUi().alert("No records found based on the filters specified");
}

function convertMinutesToHours() {
  var totalMinutes = 225;
  var hours = Math.floor(totalMinutes / 60);
  var minutes = totalMinutes % 60;

  Logger.log(hours + " hour(s) and " + minutes + " minute(s)");
}

function getUserTimeZone(allTimezones, userTimezoneName) {
  var results = ""
  const timezoneData = allTimezones.timezones;
  console.log(timezoneData)
  timezoneData.forEach(function (field) {

    if (field.javaRefCode == userTimezoneName) {
      if (field.offsetHours.includes('-')) {
        results = field.offsetHours.slice(0, 1) + '(' + field.offsetHours.slice(1) + '/24)';
      } else {
        results = '+(' + field.offsetHours + '/24)';
      }
    }
  });

  return results;

}

function requestTimezones() {

  var headers = {
    "Authorization": "Basic " + Utilities.base64Encode(APIKey + ':' + Pass)
  };

  var params = {
    "method": "GET",
    'muteHttpExceptions': true,
    "headers": headers
  };

  const timezoneUrl = TeamworkURL + "/timezones.json";
  const timezoneResponse = UrlFetchApp.fetch(timezoneUrl, params);
  const timezoneJsonData = JSON.parse(timezoneResponse);

  return timezoneJsonData;
}
