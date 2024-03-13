const myHeaders = new Headers();
/* const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere" */
const userName = "cashmanmarc@yahoo.ie";
const password = "Rokmin@34";
const siteName = "marccashman"
const taskId = "38517726"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "reminder": {
    "note": "Gentle reminder to review this task",
    "type": "EMAIL",//SMS,PUSH
    "date-time-utc": "2025-09-09T20:00:00Z",//Date format: YYYY-MM-DDTHH:MM:SSZ
    "user-id": [
      "userId1",
      "userId2"
    ],//Add the user ids for the users who should be added to the reminder
    "isRelative": false,//Set to true to follow task due date
    "relative-number-days": "-3",//Positive number refers to days before task due date ie: 3 = 3 days before. Negative number refers to days after task due date ie: -2 = 2 days after task due date. O = On due date
    "peopleAssigned": true,//true when reminder is set to all task assignees
    "assignToMultiple": false,
    "usingOffSetDueDate": false
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/tasks/"+taskId+"/reminders.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
