//https://apidocs.teamwork.com/docs/teamwork/v1/time-tracking/post-tasks-id-time-entries-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "time-entry": {
    "description": "Time created via API",
    "date": "20230801",//YYYYMMDD
    "person-id": 256492,
    "time": "15:00",
    "hours": 4,
    "minutes": 35,
    "isbillable": true,//Set to false to make time entry non billable
    "tags": "API"//Remove this line if you do not want to add a tag
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/tasks/"+taskId+"/time_entries.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
