const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const budgetId = "budgetIdHere"
const taskListId = "taskListIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "tasklistBudgets": [
    {
      "tasklist": {
        "id": taskListId,
        "type": "tasklists"
      },
      "capacity": 500000,
      "notifications": [
        {
          "notificationMedium": "EMAIL",
          "capacityThreshold": 80,
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
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/projects/budgets/${budgetId}/tasklists/budgets/bulk/add.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
