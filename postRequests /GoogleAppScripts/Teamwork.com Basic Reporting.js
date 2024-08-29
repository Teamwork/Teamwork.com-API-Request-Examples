// https://docs.google.com/spreadsheets/d/{addYourSheetIdHere}/edit?gid=0#gid=0
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('Teamwork.com Data');
  menu.addItem('Get Projects', 'getProjects');
  menu.addItem('Get Tasks', 'getTasks');
  menu.addItem('Get Time', 'getTime');
  menu.addToUi();
}

// Credentials and request header data
const APIKey = "";//username used to log into Teamwork.com - preferably a Site admin so there are no missed timelogs due to permissions
const TeamworkURL = "";//site domain - ie: https://yourSiteName.teamwork.com
const Pass = "";// User password linked to username above to log into Teamwork.com
const GoogleSheetId = "addYourSheetIdHere"; // this id can be found in the middle of your Google sheet URL inbetween /d/ and /edit

var page = 1
var setValues = true;

function getProjects() {
  //https://docs.google.com/spreadsheets/d/{addYourSheetIdHere}/edit#gid=0
  const ss = SpreadsheetApp.openById(GoogleSheetId);
  const settingsSheet = ss.getSheetByName('Settings');
  const projectSheet = ss.getSheetByName('Projects Report');

  const pageSize = settingsSheet.getRange("B2").getValue();

  const includeArchivedProjects = settingsSheet.getRange("B7").getValue(); // Capture if archived projects are to be included or not
  projectSheet.clear();

  var projectHeader = [["Project Id", "Poject Name", "Project Description", "Project Status", "Start Date", "End Date"]];
  var range = projectSheet.getRange(projectSheet.getLastRow() + 1, 1, projectHeader.length, projectHeader[0].length);
  range.setValues(projectHeader);
  projectSheet.getRange("B:C").setWrap(true);
  projectSheet.getRange("D:F").setHorizontalAlignment('center');

  var headers = {
    "Authorization": "Basic " + Utilities.base64Encode(APIKey + ':' + Pass)
  };

  var params = {
    "method": "GET",
    'muteHttpExceptions': true,
    "headers": headers
  };

  var projectValues = [];
  do {
    const projectUrl = TeamworkURL + "/projects/api/v3/projects.json?pageSize=" + pageSize + "&page=" + page + "&include=users&includeArchivedProjects=" + includeArchivedProjects;
    const projectResponse = UrlFetchApp.fetch(projectUrl, params);
    const projectJsonData = JSON.parse(projectResponse);
    const projectData = projectJsonData.projects;
    var hasMore = projectJsonData.meta.page.hasMore;
    if (projectData.length == 0) {
      hasMore = false;
      setValues = false;
    } else {
      for (var i = 0; i < projectData.length; i++) {
        var project = projectData[i];
        var projectIdUrl = generateUrl(project.id, "projectId");
        project.id = "=HYPERLINK(\"" + projectIdUrl + "\",\"" + project.id + "\")";
        project.name = "=HYPERLINK(\"" + projectIdUrl + "\",\"" + project.name + "\")";
        // console.log(project.id + " " + project.name + " " + project.description + " " + project.status)

        if (project.startDate != null) {
          project.startDate = Utilities.formatDate(new Date(project.startDate), "GMT", "dd-MM-yyyy");
        }
        if (project.endDate != null) {
          project.endDate = Utilities.formatDate(new Date(project.endDate), "GMT", "dd-MM-yyyy");
        }

        projectValues.push(
          [
            project.id,
            project.name,
            project.description,
            project.status,
            project.startDate,
            project.endDate
          ]
        );
      }
      page++;
      //console.log("HasMore: " + hasMore + " "+ page)
    }
  } while (hasMore)
  if (setValues) {
    projectSheet.getRange(projectSheet.getLastRow() + 1, 1, projectValues.length, projectValues[0].length).setValues(projectValues);
  } else {
    alertMessage();
  }
}

function getTasks() {

  const ss = SpreadsheetApp.openById(GoogleSheetId);
  const settingsSheet = ss.getSheetByName('Settings');
  const taskSheet = ss.getSheetByName('Tasks Report');

  const pageSize = settingsSheet.getRange("C2").getValue();

  const startDate = Utilities.formatDate(new Date(settingsSheet.getRange("C3").getValue()), "GMT", "yyyy-MM-dd"); // Capture start date for tasks search
  const endDate = Utilities.formatDate(new Date(settingsSheet.getRange("C4").getValue()), "GMT", "yyyy-MM-dd"); // Capture end date for tasks search
  const projectIds = settingsSheet.getRange("C5").getValue(); // Filter by a project, group of projects or all projects
  const userIds = settingsSheet.getRange("C6").getValue(); // Filter by a user, group of userss or all users
  const includeTasksArchivedProjects = settingsSheet.getRange("C7").getValue(); // Capture if archived projects are to be included or not
  const includeCompletedTasks = settingsSheet.getRange("C8").getValue(); // Capture if completed tasks are to be included or not
  const createdAfter = Utilities.formatDate(new Date(settingsSheet.getRange("C10").getValue()), "GMT", "yyyy-MM-dd"); // Capture created after date
  const createdBefore = Utilities.formatDate(new Date(settingsSheet.getRange("C11").getValue()), "GMT", "yyyy-MM-dd"); // Capture created before date
  const completedAfter = Utilities.formatDate(new Date(settingsSheet.getRange("C12").getValue()), "GMT", "yyyy-MM-dd"); // Capture completed after date
  const completedBefore = Utilities.formatDate(new Date(settingsSheet.getRange("C13").getValue()), "GMT", "yyyy-MM-dd"); // Capture completed before date
  taskSheet.clear();
  
  var dateKeyArray = ["&startDate=", "&endDate=", "&createdAfter=", "&createdBefore=", "&completedAfter=", "&completedBefore="]
  var dateArray = [startDate, endDate, createdAfter, createdBefore, completedAfter, completedBefore];
  dateArray.forEach((date, index) => {
    if (date.includes("1970-01-01")) {
      dateArray[index] = '';
    } else {
      dateArray[index] = dateKeyArray[index] + dateArray[index];
    }
  });

  var header = [["Task Id", "Task Name", "Task Description", "Task Assignee", "Start Date", "Due Date", "Estimated Time", "Task Status"]];
  var range = taskSheet.getRange(taskSheet.getLastRow() + 1, 1, header.length, header[0].length);
  range.setValues(header);
  taskSheet.getRange("A:A").setHorizontalAlignment('center');
  taskSheet.getRange("B:C").setWrap(true);
  taskSheet.getRange("D:F").setHorizontalAlignment('center').setWrap(true);

  var headers = {
    "Authorization": "Basic " + Utilities.base64Encode(APIKey + ':' + Pass)
  };

  var params = {
    "method": "GET",
    'muteHttpExceptions': true,
    "headers": headers
  };

  var taskValues = [];

  do {

    const taskUrl = TeamworkURL + "/projects/api/v3/tasks.json?pageSize=" + pageSize + "&page=" + page + "&include=users&includeArchivedProjects=" + includeTasksArchivedProjects + "&includeCompletedTasks=" + includeCompletedTasks + dateArray[0] + dateArray[1] + dateArray[2] + dateArray[3] + dateArray[4] + dateArray[5] + "&projectIds=" + projectIds + "&responsiblePartyIds="+userIds;// + userIds+"&ids=13014941"
    
    const taskResponse = UrlFetchApp.fetch(taskUrl, params);
    const taskJsonData = JSON.parse(taskResponse);
    const taskData = taskJsonData.tasks;
    const includedData = taskJsonData.included;
    //console.log(taskData)
    var hasMore = taskJsonData.meta.page.hasMore;
    if (taskData.length == 0) {
      hasMore = false;
      setValues = false;
    } else {
      for (var i = 0; i < taskData.length; i++) {
        var task = taskData[i];
        var users = task.assigneeUserIds;
        var taskIdUrl = generateUrl(task.id, "taskId");
        task.id = "=HYPERLINK(\"" + taskIdUrl + "\",\"" + task.id + "\")";
        task.name = "=HYPERLINK(\"" + taskIdUrl + "\",\"" + task.name + "\")";
        
        if (task.startDate != null) {
          task.startDate = Utilities.formatDate(new Date(task.startDate), "GMT", "dd-MM-yyyy");
        }
        if (task.dueDate != null) {
          task.dueDate = Utilities.formatDate(new Date(task.dueDate), "GMT", "dd-MM-yyyy");
        }
        console.log(task.id + " " + task.name + " " + task.description + " " + task.startDate + " " + task.dueDate + " " + task.estimateMinutes)

        if (users != null) {
          var assignees = getUsers(users, includedData.users, users.length);
        } else {
          var assignees = "";
        }
        taskValues.push(
          [
            task.id,
            task.name,
            task.description,
            assignees,
            task.startDate,
            task.dueDate,
            task.estimateMinutes,
            task.status,
          ]
        );
      }
      page++;
      //console.log("HasMore: " + hasMore + " "+ page)
    }
  } while (hasMore)
  if (setValues) {
    taskSheet.getRange(taskSheet.getLastRow() + 1, 1, taskValues.length, taskValues[0].length).setValues(taskValues);
  } else {
    alertMessage();
  }
}

// getTime will iterate through the V3 time entries endpoint > populate time entries to a Google Sheet based on how time appears in the UI for the user which the time is logged for
function getTime() {
  // https://docs.google.com/spreadsheets/d/{addYourSheetIdHere}/edit#gid=0
  const allTimezones = requestTimezones();
  const ss = SpreadsheetApp.openById(GoogleSheetId);
  const settingsSheet = ss.getSheetByName('Settings');
  const timeSheet = ss.getSheetByName('Time Report');
  
  const pageSize = settingsSheet.getRange("D2").getValue();
  const fromDate = Utilities.formatDate(new Date(settingsSheet.getRange("D3").getValue()), "GMT", "yyyy-MM-dd"); // Capture start date for timelogs search
  const toDate = Utilities.formatDate(new Date(settingsSheet.getRange("D4").getValue()), "GMT", "yyyy-MM-dd"); // Capture end date for timelogs search
  const projectIds = settingsSheet.getRange("D5").getValue(); // Filter by a project, group of projects or all projects
  const userIds = settingsSheet.getRange("D6").getValue(); // Filter by a user, group of userss or all users
  const includeArchivedProjects = settingsSheet.getRange("D7").getValue(); // Capture if archived projects are to be included or not
  const includeTimezoneData = settingsSheet.getRange("D9").getValue(); // Capture if archived projects are to be included or not

  timeSheet.clear();

  // Sheet setup and cell formatting
  var header = [["Time Id", "Time Description", "Time entry User", "Time entry as stored in DB (UTC Timezone)", "Minutes", "Is Billable", "Project Id", "Task Id", "Time entry based on time entry users timezone preference", "Time entry User's Time Zone"]];
  var range = timeSheet.getRange(timeSheet.getLastRow() + 1, 1, header.length, header[0].length);
  range.setValues(header);
  timeSheet.getRange("A:A").setHorizontalAlignment('center');
  timeSheet.getRange("B:B").setWrap(true);
  timeSheet.getRange("D:J").setHorizontalAlignment('center');
  timeSheet.getRange(1, 1, 1, 10).setWrap(true).setVerticalAlignment('middle');

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

  do {
    const timeUrl = TeamworkURL + "/projects/api/v3/time.json?pageSize=" + pageSize + "&page=" + page + "&include=users&startDate=" + fromDate + "&endDate=" + toDate + "&includeArchivedProjects=" + includeArchivedProjects + "&projectIds=" + projectIds + "&user&assignedToUserIds=" + userIds;
    console.log(timeUrl)
    const timeResponse = UrlFetchApp.fetch(timeUrl, params);
    const timeJsonData = JSON.parse(timeResponse);
    const timeData = timeJsonData.timelogs;
    const userData = timeJsonData.included.users;
    var hasMore = timeJsonData.meta.page.hasMore;

    for (var i = 0; i < timeData.length; i++) {
      var time = timeData[i];
      var timezone = userData[time.userId].timezone.toString();
      console.log(time.id + " " + time.description + " " + time.timeLogged + " " + time.userId + " "
        + time.minutes + " " + time.isBillable + " " + time.projectId + " " + time.taskId + " " + timezone + " " + userData[time.userId].timezone)
      var timezoneDiff = getUserTimeZone(allTimezones, userData[time.userId].timezone);
      time.timeLogged = Utilities.formatDate(new Date(time.timeLogged), "GMT", "dd-MM-yyyy hh:mm");

      var user = timeJsonData.included.users[time.userId.toString()].firstName + " "
        + timeJsonData.included.users[time.userId.toString()].lastName;

      var projectUrl = generateUrl(time.projectId.toString(), "projectTimeId");
      var projectUrlParsed = "=HYPERLINK(\"" + projectUrl + "\",\"" + time.projectId + "\")";

      if (time.taskId != null) {
        var taskUrl = generateUrl(time.taskId.toString(), "taskId");
        var taskUrlParsed = "=HYPERLINK(\"" + taskUrl + "\",\"" + time.taskId + "\")";
      } else {
        var taskUrlParsed = "No Task";
      }
      if (includeTimezoneData == "true") {
        timeValues.push(
          [
            time.id,
            time.description,
            user,
            time.timeLogged,
            toHoursAndMinutes(time.minutes),
            time.isBillable,
            projectUrlParsed,
            taskUrlParsed,
            "=D" + (rows) + timezoneDiff,
            timezone,
          ]
        );
      } else {
        timeValues.push(
          [
            time.id,
            time.description,
            user,
            time.timeLogged,
            toHoursAndMinutes(time.minutes),
            time.isBillable,
            projectUrlParsed,
            taskUrlParsed,
          ]
        );
        timeSheet.getRange("I1:J1").clear();
      }
      rows++
    }
    page++;
    console.log("HasMore: " + timeJsonData.meta.page.hasMore + " " + page)
  } while (hasMore)
  if (setValues) {
    timeSheet.getRange(timeSheet.getLastRow() + 1, 1, timeValues.length, timeValues[0].length).setValues(timeValues);
  } else {
    alertMessage();
  }
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

// generateUrl is taking in an entity id with entity name ie: projects > builds a URL based on entity to pass back in project, tasks and time functions
function generateUrl(id, entity) {

  if (entity == "taskId") {
    var parsedUrl = TeamworkURL + "/app/tasks/" + id;
  } else if (entity == "projectTimeId") {
    var parsedUrl = TeamworkURL + "/app/projects/" + id + "/time";
  } else {
    var parsedUrl = TeamworkURL + "/app/projects/" + id + "/overview/summary";
  }

  return parsedUrl
}

function getUsers(users, includedData, length) {

  var assignees = ""

  var iterate = 0
  do {
    assignees += includedData[user[iterate].toString()].firstName + " " + includedData[user[iterate].toString()].lastName;
    iterate++
    if (iterate == length) {

    } else {
      assignees += ", ";
    }
  } while (iterate < length)
  
  return assignees
}

function alertMessage() {
  SpreadsheetApp.getUi().alert("No records found based on the filters specified");
}
