//https://apidocs.teamwork.com/docs/teamwork/v3/time-tracking/post-projects-api-v3-tasks-task-id-time-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const projectId = "projectIdHere";
const taskId = "taskIdHere";
const userId = "userIdHere";
const date = "dateHere";
const time = "timeHere";
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "timelog": {
    "date": date,
    "time": time,
    "isUtc": true,
    "description": "Meeting with Marketing",
    "isBillable": true,
    "minutes": 35,
    "projectId": projectId,
    "taskId": taskId,
    "userId": userId,
    "tagIds": [
      132176
    ]
  },
  "tags": [
    {
      "color": "#f78233",
      "name": "Meeting",
      "projectId": 0
    }
  ],
  "timelogOptions": {
    "markTaskComplete": false
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/projects/api/v3/tasks/"+taskId+"/time.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
