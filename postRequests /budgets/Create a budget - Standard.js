// Create a project budget > notify user(s) > set project rates
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const budgetCategory = "budgetCategoryHere"// Options available: "STANDARD", "FIXEDFEE"
const capacity = "capacityHere";
const startDate = "startDateHere";// YYYYMMDD
const endDate = "endDateHere";// YYYYMMDD
const projectId = "projectIdHere"
const userId = "userIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "budget": {
    "budgetCategory": budgetCategory,
    "capacity": capacity,
    "endDateTime": endDate,
    "isRepeating": false,
    "notifications": [
      {
        "notificationMedium": "EMAIL",
        "capacityThreshold": 80,
        "userIds": [
          userId
        ],
        "teamIds": [],
        "companyIds": []
      }
    ],
    "projectId": projectId,
    "startDateTime": startDate,
    "type": "FINANCIAL",//Options Available: "FINANCIAL", "TIME"
    "timelogType": "BILLABLE",
    "isRetainer": false,
    "projectRate": 15000// 15000 = $150, 27500 = $275, etc
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/projects/api/v3/projects/budgets.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
