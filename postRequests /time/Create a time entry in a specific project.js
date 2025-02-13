// This code sample will create a time entry on the specified project and can be extended to add to a specific task if applicaiable with the task id
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v3/time-tracking/post-projects-api-v3-projects-project-id-time-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const projectId = projectIdHere; // Int
const taskId = null; // // Leave as null if applying tiome to project only - If you want to link time to a task add the taskId here - int value ie: 3645454
const userId = userIdHere; // Int
const date = "2024-01-23"; // Format: yyyy-mm-dd as a string
const time = "17:18:00"; // Format hh:mm:ss as a string
const tags = []; // Comma separated array of tag ids e - int value ie: [61907,61908] > Leave empty array for no tags
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "timelog": {
    "date": date,
    "time": time,
    "isUtc": true,
    "description": "Description here",
    "isBillable": false, // Set to true if you want to mark the time entry as billable
    "minutes": 120,
    "projectId": projectId,
    "taskId": taskId,
    "userId": userId,
    "tagIds": tags
  },
  "tags": [],
  "timelogOptions": {
    "markTaskComplete": false // Set to true if you want to complete the task with the request
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/projects/${projectId}/time.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
