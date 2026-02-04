// this code sample will log time on a task based on the task id provided
// https://apidocs.teamwork.com/docs/teamwork/v3/time-tracking/post-projects-api-v3-tasks-task-id-time-json
// REQUIRED FIELDS: task id in the URL, date, time, minutes and userId
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const projectId = projectIdHere; // Int
const taskId = taskIdHere; // Required field Int - Add a 0 for taskId if you want to log time at project level only
const userId = userIdHere; // Required field Int
const date = "dateHere"; // Required field ie: "2024-01-23" - Format: "yyyy-mm-dd"
const time = "timeHere"; // Required field ie: "17:18:00" - Format: "hh:mm:ss"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "timelog": {
    "date": date, //Required 
    "time": time, //Required 
    "isUtc": true,
    "description": "Meeting with Marketing",
    "isBillable": true,
    "minutes": 35, //Required 
    "projectId": projectId,
    "taskId": taskId,
    "userId": userId, // Required; however if this data point is removed, the time entry will be associated with the user whos API credentials are being used
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

fetch(`https://${siteName}.teamwork.com/projects/api/v3/tasks/${taskId}/time.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
