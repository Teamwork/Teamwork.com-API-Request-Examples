/*
Proof of Concept for using the Teamwork V3 time API endpoints to populate a Google sheet with time logging data based on users timezone.
Settings page on linked Google sheet can be used to filter by endpoint page size, pages, logged time dates, user(s) and project(s) including archived projects
API Calls: GET "/projects/api/v3/time.json"; https://apidocs.teamwork.com/docs/teamwork/v3/time-tracking/get-projects-api-v3-time-json
and GET "/timezones.json"; https://apidocs.teamwork.com/docs/teamwork/v1/timezones/get-timezones-json
Author: Marc Cashman <marc.cashman@teamwork.com>
Version: 1.1
THE SCRIPT IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SCRIPT OR THE USE OR OTHER DEALINGS IN THE SCRIPT.
*/

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('Teamwork.com Data');
  menu.addItem('Get Time Report', 'getTime');
  menu.addToUi();
}

// requestTimezones will call the timezone endpoint and store data for later to compare with users timezone preference
function requestTimezones() {
  var APIKey = "cashmanmarc@yahoo.ie";
  var TeamworkURL = "https://marccashman.teamwork.com";
  var Pass = "Rokmin@34";
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

// getUserTimeZone will use the users timezone name > compare with master timezone list and map the time difference
function getUserTimeZone(allTimezones, userTimezoneName) {

  const timezoneData = allTimezones.timezones;

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

// getZoneTime will iterate through the V3 time entries endpoint > populate time entries to a Google Sheet based on how time appears in the UI for the user which the time is logged for
function getTime() {
  var allTimezones = requestTimezones();

  //https://docs.google.com/spreadsheets/d/10g66jWa3jqpKjDy1Rpt-an5L86tAxLPNTMuY3flMF4Y/edit?gid=0#gid=0
  var ss = SpreadsheetApp.openById('10g66jWa3jqpKjDy1Rpt-an5L86tAxLPNTMuY3flMF4Y');
  var settingsSheet = ss.getSheetByName('Settings');
  const timeReportSheet = ss.getSheetByName('Get time report');

  var APIKey = "cashmanmarc@yahoo.ie";
  var TeamworkURL = "https://marccashman.teamwork.com";
  var Pass = "Rokmin@34";

  // Settings tab from Google Sheet
  const pageSize = settingsSheet.getRange("B2").getValue(); // Capture endpoint page size (max 500)
  const pages = settingsSheet.getRange("B3").getValue(); // Capture endpoint page count
  const fromDate = Utilities.formatDate(new Date(settingsSheet.getRange("B4").getValue()), "GMT", "yyyy-MM-dd"); // Capture start date for timelogs search
  const toDate = Utilities.formatDate(new Date(settingsSheet.getRange("B5").getValue()), "GMT", "yyyy-MM-dd"); // Capture end date for timelogs search
  const projectIds = settingsSheet.getRange("B6").getValue(); // Filter by a project, group of projects or all projects
  const userIds = settingsSheet.getRange("B7").getValue(); // Filter by a user, group of userss or all users
  const includeArchivedProjects = settingsSheet.getRange("B8").getValue(); // Capture if archived projects are to be included or not

  timeReportSheet.clear();

  // Generate new header row and column header names
  var header = [["Time Id", "Time Description", "Time logged (User Perspective)", "User", "Timelog Duration", "Is Billable", "Project Id", "Task Id", "Users Time Zone", "Date / Start time (DB record)"]];
  var range = timeReportSheet.getRange(timeReportSheet.getLastRow() + 1, 1, header.length, header[0].length);
  range.setValues(header);
  console.log("here")

  var headers = {
    "Authorization": "Basic " + Utilities.base64Encode(APIKey + ':' + Pass)
  };

  var params = {
    "method": "GET",
    'muteHttpExceptions': true,
    "headers": headers
  };

  var rows = 2
  var timeValues = [];

  for (var page = 1; page <= pages; page++) {
    const timeUrl = TeamworkURL + "/projects/api/v3/time.json?pageSize=" + pageSize + "&page=" + page + "&include=users&startDate=" + fromDate + "&endDate=" + toDate + "&includeArchivedProjects=" + includeArchivedProjects + "&projectIds=" + projectIds + "&user&assignedToUserIds=" + userIds;
    const timeResponse = UrlFetchApp.fetch(timeUrl, params);
    const timeJsonData = JSON.parse(timeResponse);
    const timeData = timeJsonData.timelogs;
    const userData = timeJsonData.included.users;
    const metaData = timeJsonData.meta.page;

    if (timeData.length != 0) {
      for (var i = 0; i < timeData.length; i++) {
        console.log("in funct")
        var time = timeData[i];
        var timezone = userData[time.userId].timezone.toString();
        console.log(time.id + " " + time.description + " " + time.timeLogged + " " + time.userId + " "
          + time.minutes + " " + time.isBillable + " " + time.projectId + " " + time.taskId + " " + timezone + " " + userData[time.userId].timezone)
        var timezoneDiff = getUserTimeZone(allTimezones, userData[time.userId].timezone);
        var date = Utilities.formatDate(new Date(time.timeLogged), "GMT", "dd-MM-yyyy hh:mm");

        var user = timeJsonData.included.users[time.userId.toString()].firstName + " "
          + timeJsonData.included.users[time.userId.toString()].lastName;

        var projectUrl = TeamworkURL + "/app/projects/" + time.projectId.toString() + "/time";
        var projectUrlParsed = "=HYPERLINK(\"" + projectUrl + "\",\"" + time.projectId + "\")";

        if (time.taskId != null) {
          var taskUrl = TeamworkURL + "/app/tasks/" + time.taskId.toString();
          var taskUrlParsed = "=HYPERLINK(\"" + taskUrl + "\",\"" + time.taskId + "\")";
        } else {
          var taskUrlParsed = "No Task";
        }

        timeValues.push(
          [
            time.id,
            time.description,
            "=J" + (rows) + timezoneDiff,
            user,
            toHoursAndMinutes(time.minutes),
            time.isBillable,
            projectUrlParsed,
            taskUrlParsed,
            timezone,
            date,
          ]
        );
        rows++

      }
      if (metaData.hasMore == false) {
        page = pages + 1
      }
      // Populate Sheet with data and format specific columns
      timeReportSheet.getRange(timeReportSheet.getLastRow() + 1, 1, timeValues.length, timeValues[0].length).setValues(timeValues);
      timeReportSheet.getRange("C:C").setHorizontalAlignment('center');
      timeReportSheet.getRange("E:E").setHorizontalAlignment('center');
      timeReportSheet.getRange("J:J").setHorizontalAlignment('center');
    } else {
      page = pages + 1
    }
  }
}

// toHoursAndMinutes will capture minutes logged for timelog and convert to hours and minutes
function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
}
function padToTwoDigits(num) {
  return num.toString().padStart(2, '0');
}
