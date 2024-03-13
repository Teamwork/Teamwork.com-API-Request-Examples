const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "person": {
    "receiveDailyReports": true,
    "dailyReportSort": "DATE",//PROJECT
    "receiveDailyReportsAtWeekend": true,
    "receiveDailyReportsIfEmpty": true,
    "dailyReportEventsType": "ALL",//MINE if you want to flag events for user only
    "receiveDailyReportsAtTime": "7",//PM times follow 24 hour clock ie: 21 = 9pm
    "dailyReportDaysFilter": 14,//Change this to alter how many days to filter tasks
    "allowEmailNotifications": true
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/people/"+userId+".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
