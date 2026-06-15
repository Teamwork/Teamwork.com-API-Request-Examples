const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const tasklistBudgetId = "tasklistBudgetIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "tasklistBudget": {
    "id": tasklistBudgetId,
    "capacity": 510000,
    "notifications": [
      {
        "notificationMedium": "EMAIL",
        "capacityThreshold": 90,
        "users": [
          {
            "id": 238860,
            "type": "users"
          }
        ],
        "teams": [],
        "companies": []
      }
    ]
  }
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/projects/budgets/tasklists/budgets/${tasklistBudgetId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
