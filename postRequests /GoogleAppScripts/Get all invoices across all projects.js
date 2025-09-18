/*
Proof of Concept for using the Teamwork.com V1 and V3 Invoices API endpoints to populate a Google sheet with invoice details.
Concept: Since the Teamwork.com UI does not have a global area for invoices this is a work around for getting all invoices onto a report via Google Sheets. the script is designed to add a get report button directly on the Google sheet for easy reporting
The script captures the invoice status option from the settings sheet and uses this to refine the request to all, open or completed invoices:
API Call: 
GET ${TeamworkURL}/invoices.json?type=${invoiceStatus}
    ${TeamworkURL}/projects/api/v3/invoices/${invoice["id"].toString()}.json
    ${TeamworkURL}/projects/api/v3/projects/${invoice["project-id"].toString()}.json?include=projectCategories;
Author: Marc Cashman <marc.cashman@teamwork.com>
Version: 1.2
Update: Project Category added to report
*/

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('Pull Report');
  menu.addItem('Get Invoice Report', 'getInvoicesReport');
  menu.addToUi();
}

// Credentials and request header data
const APIKey = "";//username used to log into Teamwork.com - preferably a Site admin so there are no missed timelogs due to permissions
const Pass = "xxx";// User password linked to username above to log into Teamwork.com
const GoogleSheetId = ""; // this id can be found in the middle of your Google sheet URL inbetween /d/ and /edit
const TeamworkURL = "";//site domain - ie: https://yourSiteName.teamwork.com

var values = [];

var headers = {
  "Authorization": `Basic ${Utilities.base64Encode(APIKey + ':' + Pass)}`
};

var params = {
  "method": "GET",
  'muteHttpExceptions': true,
  "headers": headers
};

function getInvoicesReport() {
  //https://docs.google.com/spreadsheets/d/{GoogleSheetId}/edit#gid=0
  var ss = SpreadsheetApp.openById(GoogleSheetId);
  var settingsSheet = ss.getSheetByName('Settings');
  var reportSheet = ss.getSheetByName("Invoice Report");
  var invoiceStatus = settingsSheet.getRange("B1").getValue();

  /* Preparing invoice report sheet*/
  reportSheet.clear();
  var header = [["Issue Date", "Invoice Id", "Invoice Description", "Category", "Client Name", "Project Name", "Time Cost", "Expenses Cost", "Total cost", "Invoice Type", "Invoiced Status", "Completed Date"]];
  var range = reportSheet.getRange(reportSheet.getLastRow() + 1, 1, header.length, header[0].length);

  var currencyColumns = reportSheet.getRange("G:I");
  currencyColumns.setNumberFormat("$#,##00.00");

  var centerColumns = reportSheet.getRange("A:B");
  centerColumns.setHorizontalAlignment('center')

  range.setBackground("#CFE2F3");
  range.setFontWeight("bold");
  range.setValues(header);
  reportSheet.setFrozenRows(1);

  /* Requesting all invoices across all project */
  const url = `${TeamworkURL}/invoices.json?type=${invoiceStatus}`;
  var response = UrlFetchApp.fetch(url, params);
  var jsonData = JSON.parse(response);
  
  var report = jsonData.invoices;
  Logger.log(report);

  // Sort payload before extracting data
  report.sort(function (x, y) {
    let a = y["project-name"],
      b = x["project-name"];
    return a == b ? 0 : a < b ? 1 : -1;
  });
  report.sort(function (x, y) {
    let a = x["company-name"],
      b = y["company-name"];
    return a == b ? 0 : a < b ? 1 : -1;
  });

  // loop over the returned data to get values required for report
  for (var i = 0; i < report.length; i++) {
    var projectCategory = "";
    var invoice = report[i];

    /* Build Clickable links for project billing page and each invoice */
    var projectUrl = `${TeamworkURL}/app/projects/${invoice["project-id"].toString()}/finance/billing/open`;
    var projectUrlParsed = `=HYPERLINK("${projectUrl}","${invoice["project-name"]}")`;

    var invoiceUrl = `${TeamworkURL}/app/projects/${invoice["project-id"].toString()}/finance/billing/${invoice["id"]}`
    var invoiceUrlParsed = `=HYPERLINK("${invoiceUrl}","${invoice["id"]}")`;
    console.log(invoiceUrlParsed);

    if (invoice["status"] == "completed") {
      var dateCompleted = Utilities.formatDate(new Date(invoice["date-updated"]), "GMT", "dd/MM/yyyy")
    } else {
      var dateCompleted = "";
    }

    var projectCatUrl = `${TeamworkURL}/projects/api/v3/projects/${invoice["project-id"].toString()}.json?include=projectCategories`;
    var projectCatResponse = UrlFetchApp.fetch(projectCatUrl, params);
    var projectCatJsonData = JSON.parse(projectCatResponse);

    var catId = projectCatJsonData.project.categoryId;

    if(catId != null){
    projectCategory = projectCatJsonData.included.projectCategories[`${catId}`].name;
    Logger.log(projectCategory);
    }

    var v3InvoiceUrl = `${TeamworkURL}/projects/api/v3/invoices/${invoice["id"].toString()}.json`;
    var v3InvoiceResponse = UrlFetchApp.fetch(v3InvoiceUrl, params);
    var v3InvoiceJsonData = JSON.parse(v3InvoiceResponse);
    var singleInvoice = v3InvoiceJsonData.invoice;
    var dateCreated = Utilities.formatDate(new Date(singleInvoice["dateCreated"]), "GMT", "dd/MM/yyyy");

    if (singleInvoice["pricing"] == "fixed") {
      singleInvoice["totalBillable"] = singleInvoice["fixedCost"]
    }
    // push a row of data as 2d array
    values.push(
      [
        dateCreated,
        invoiceUrlParsed,
        singleInvoice["description"],
        projectCategory,
        singleInvoice["companyName"],
        projectUrlParsed,
        singleInvoice["totalTimeBillable"],
        singleInvoice["totalExpenses"],
        singleInvoice["totalBillable"],
        `${singleInvoice["pricing"].charAt(0).toUpperCase()}${singleInvoice["pricing"].slice(1)}`,
        singleInvoice["status"],
        dateCompleted
      ]
    );
  }
  reportSheet.getRange(reportSheet.getLastRow() + 1, 1, values.length, values[0].length).setValues(values);
}
