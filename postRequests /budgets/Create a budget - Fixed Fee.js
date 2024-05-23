// Create a fixed feed budget > 50K with a 7% profit  and notify user
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const budgetCategory = "budgetCategoryHere"
const capacity = "capacityHere"
const startDate = "startDateHere";
const endDate = "endDateHere";
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
        "type": "FINANCIAL",
        "timelogType": "ALL",
        "isRetainer": false,
        "budgetProfitMargin": 7
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
