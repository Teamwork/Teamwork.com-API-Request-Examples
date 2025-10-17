// This code sample will create an new project budget expense
// This is an undocumented endpoint which is used in app
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "invoiceIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "expense": {
    "budgetId": 42383, // null if you are not applying to a budget
    "userId": 238860,
    "title": "Added via API",
    "expenseDescription": "Added via API",
    "costAmount": 1000, // 1000 = $1000 note that the symbol will vary based on your project currency
    "billableAmount": 1000,// Add null if the expense is not billable
    "date": "2025-10-17",
    "category": "accounting",
    "customCategoryId": null,
    "files": [],
    "pendingFileAttachments": []
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/projects/{${projectId}}/expenses.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
