/*
Proof of Concept to create a tasklist budget report based on dollar value and antoher tab for time values. 
The script captures the values set on the setting page which includes filters for:
Page Size, Start Date, End Date, Project Id's (comma separated list), Include Archive Projects

Teamwork.com API Calls: 
GET ${TeamworkURL}/projects/api/v3/projects/budgets/${budgetId}/tasklists/budgets.json
    ${TeamworkURL}/projects/api/v3/projects/budgets.json?

Open the following sheet > create a copy > go to Extenstions > Apps script and the new sheet will be linked directly to your script
https://docs.google.com/spreadsheets/d/1B0hP-l80GHR65zNoRqwNPvmxNPTWLTYprBGHns-9ubs/edit?gid=327459809#gid=327459809

Author: Marc Cashman <marc.cashman@teamwork.com>
Version: 1.1
*/
//https://docs.google.com/spreadsheets/d/1B0hP-l80GHR65zNoRqwNPvmxNPTWLTYprBGHns-9ubs/edit#gid=0
var ss = SpreadsheetApp.openById('1B0hP-l80GHR65zNoRqwNPvmxNPTWLTYprBGHns-9ubs');
var reportSheet = ss.getSheetByName("Budget Report ($ value)");
var reportTimeSheet = ss.getSheetByName("Budget Report (Time based)");
var settingsSheet = ss.getSheetByName('Settings');
var APIKey = "";//username used to log into Teamwork.com - preferably a Site admin so there are no missed timelogs due to permissions
var Pass = "";// User password linked to username above to log into Teamwork.com
var TeamworkURL = "";//site domain - ie: https://yourSiteName.teamwork.com

var headers = {
  "Authorization": "Basic " + Utilities.base64Encode(APIKey + ':' + Pass)
};

var params = {
  "method": "GET",
  'muteHttpExceptions': true,
  "headers": headers
};

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('Pull Report');
  menu.addItem('Get $ Budget Report', 'fetchTaskListBudgetsDollar');
  menu.addItem('Get Time Budget Report', 'fetchTaskListBudgetsTime');
  menu.addToUi();
}

function fetchTaskListBudgetsDollar() {
  var budgetIds = fetchTeamworkBudgets("dollar");
  reportSheet.clear();
  var header = [["Project", "Budget Id", "TL Budget Id", "Tasklist", "Capacity", "Capacity Used", "Capacity remaining"]];
  var range = reportSheet.getRange(reportSheet.getLastRow() + 1, 1, header.length, header[0].length);
  var cashColumn = reportSheet.getRange("E:G");
  cashColumn.setNumberFormat("$#,##00.00");
  range.setValues(header);
  reportSheet.setFrozenRows(1);

  budgetIds.forEach(function (budgetId) {
    var tasklistUrl = `${TeamworkURL}/projects/api/v3/projects/budgets/${budgetId}/tasklists/budgets.json?include=tasklists,notifications,notifications.users,notifications.companies,notifications.teams&limit=15&pageSize=15&cursor=`;
    var tasklistResponse = UrlFetchApp.fetch(tasklistUrl, params);
    //var jsonData = JSON.parse(response);
    var tasklistData = JSON.parse(tasklistResponse);
    if (tasklistData.tasklistBudgets.length > 0) {
      var taskListBudgets = tasklistData.tasklistBudgets;
      Logger.log(`Tasklist data for Budget ID ${budgetId}:`);
      Logger.log(taskListBudgets);
      taskListBudgets.forEach(function (tlBudget) {
        Logger.log(`ProjectId: ${tlBudget.projectId}`)
        var projectUrl = `${TeamworkURL}/app/projects/${tlBudget.projectId}/finance/budgets`;
        var projectUrlParsed = `=HYPERLINK("${projectUrl}","${tlBudget.projectId}")`;
        Logger.log(`Budget Type: ${tlBudget.type}`)
        Logger.log(`Budget Id: ${tlBudget.projectbudget.id}`)
        Logger.log(`Tasklist Budget Id: ${tlBudget.id}`)
        Logger.log(`Tasklist Id: ${tlBudget.tasklistId}`)
        Logger.log(`Capacity: ${tlBudget.capacity}`)
        Logger.log(`Capacity used: ${tlBudget.capacityUsed}`)
        Logger.log(`Budget left: ${tlBudget.capacity - tlBudget.capacityUsed}`)
        var values = [];
        if (tlBudget.type == "FINANCIAL") {
          values.push(
            [
              projectUrlParsed,
              tlBudget.projectbudget.id,
              tlBudget.id,
              tlBudget.tasklistId,
              tlBudget.capacity / 100,
              tlBudget.capacityUsed / 100,
              (tlBudget.capacity / 100) - (tlBudget.capacityUsed / 100),
            ]
          );
          reportSheet.getRange(reportSheet.getLastRow() + 1, 1, values.length, values[0].length).setValues(values);
        }
      });
    }
  });
}

function fetchTaskListBudgetsTime() {
  var budgetIds = fetchTeamworkBudgets("time");
  reportTimeSheet.clear();
  var header = [["Project", "Budget Id", "TL Budget Id", "Tasklist", "Capacity (h:m)", "Capacity Used (h:m)", "Capacity remaining (h:m)"]];
  var range = reportTimeSheet.getRange(reportTimeSheet.getLastRow() + 1, 1, header.length, header[0].length);
  range.setValues(header);
  reportTimeSheet.setFrozenRows(1);

  budgetIds.forEach(function (budgetId) {
    var tasklistUrl = `${TeamworkURL}/projects/api/v3/projects/budgets/${budgetId}/tasklists/budgets.json?include=tasklists,notifications,notifications.users,notifications.companies,notifications.teams&limit=15&pageSize=15&cursor=`;
    var tasklistResponse = UrlFetchApp.fetch(tasklistUrl, params);
    //var jsonData = JSON.parse(response);
    var tasklistData = JSON.parse(tasklistResponse);
    if (tasklistData.tasklistBudgets.length > 0) {

      var taskListBudgets = tasklistData.tasklistBudgets;
      Logger.log(`Tasklist data for Budget ID ${budgetId}:`);
      Logger.log(taskListBudgets);
      taskListBudgets.forEach(function (tlBudget) {
        Logger.log(`ProjectId: ${tlBudget.projectId}`)
        var projectUrl = `${TeamworkURL}/app/projects/${tlBudget.projectId}/finance/budgets`;
        var projectUrlParsed = `=HYPERLINK("${projectUrl}","${tlBudget.projectId}")`;
        Logger.log(`Budget Type: ${tlBudget.type}`)
        Logger.log(`Budget Id: ${tlBudget.projectbudget.id}`)
        Logger.log(`Tasklist Budget Id: ${tlBudget.id}`)
        Logger.log(`Tasklist Id: ${tlBudget.tasklistId}`)
        Logger.log(`Capacity: ${tlBudget.capacity}`)
        Logger.log(`Capacity used: ${tlBudget.capacityUsed}`)
        Logger.log(`Budget left: ${tlBudget.capacity - tlBudget.capacityUsed}`)
        var values = [];
        if (tlBudget.type == "TIME") {
          values.push(
            [
              projectUrlParsed,
              tlBudget.projectbudget.id,
              tlBudget.id,
              tlBudget.tasklistId,
              tlBudget.capacity / 60,
              tlBudget.capacityUsed / 60,
              (tlBudget.capacity / 60) - (tlBudget.capacityUsed / 60),
            ]
          );
          reportTimeSheet.getRange(reportTimeSheet.getLastRow() + 1, 1, values.length, values[0].length).setValues(values);
        }
      });

    }
  });
}

function fetchTeamworkBudgets(budgetType) {
  var budgetType = budgetType;
  var pageSize = settingsSheet.getRange("B2").getValue();

  if (settingsSheet.getRange("B3").getValue() == '') {

    var fromDate = settingsSheet.getRange("B3").getValue(); // Capture start date for budgets

  } else {

    var fromDate = `&startDate=${Utilities.formatDate(new Date(settingsSheet.getRange("B3").getValue()), "GMT", "yyyy-MM-dd")}`; // Capture start date for budgets
  }
  if (settingsSheet.getRange("B4").getValue() == '') {
    var toDate = settingsSheet.getRange("B4").getValue(); // Capture start date for budgets
  } else {
    var toDate = `&endDate=${Utilities.formatDate(new Date(settingsSheet.getRange("B4").getValue()), "GMT", "yyyy-MM-dd")}`; // Capture start date for budgets
  }
  var projectIds = settingsSheet.getRange("B5").getValue(); // Filter by a project, group of projects or all projects
  var budgetStatus = settingsSheet.getRange("B6").getValue(); // Filter by a budget status, or group of budget statuses
  var includeArchivedProjects = settingsSheet.getRange("B7").getValue(); // Capture if archived projects are to be included or not
  if (budgetType == "time") {
    Logger.log("time only");
    pageSize = settingsSheet.getRange("C2").getValue();
    if (settingsSheet.getRange("C3").getValue() == '') {

      var fromDate = settingsSheet.getRange("C3").getValue(); // Capture start date for budgets

    } else {

      var fromDate = `&startDate=${Utilities.formatDate(new Date(settingsSheet.getRange("C3").getValue()), "GMT", "yyyy-MM-dd")}`; // Capture start date for budgets
    }
    if (settingsSheet.getRange("C4").getValue() == '') {
      var toDate = settingsSheet.getRange("C4").getValue(); // Capture start date for budgets
    } else {
      var toDate = `&endDate=${Utilities.formatDate(new Date(settingsSheet.getRange("C4").getValue()), "GMT", "yyyy-MM-dd")}`; // Capture start date for budgets
    }
    projectIds = settingsSheet.getRange("C5").getValue();
    budgetStatus = settingsSheet.getRange("C6").getValue();
    includeArchivedProjects = settingsSheet.getRange("C7").getValue();
  }
  var url = `${TeamworkURL}/projects/api/v3/projects/budgets.json?page=1&pageSize=${pageSize}${fromDate}${toDate}&projectIds=${projectIds}&status=${budgetStatus}&includeArchivedProjects=${includeArchivedProjects}`;

  var response = UrlFetchApp.fetch(url, params);
  var json = JSON.parse(response.getContentText());

  var budgetIds = [];

  if (json.budgets && Array.isArray(json.budgets)) {
    json.budgets.forEach(function (budget) {
      if (budget.id) {
        budgetIds.push(budget.id);
      }
    });
  }

  Logger.log("Budget IDs: " + JSON.stringify(budgetIds));
  return budgetIds;  // Pass budget ids over to functions
}
