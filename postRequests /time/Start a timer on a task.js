// This code sample will start a timer on a task.
// If you want to start a timer that is not link to a task, you can pass in 0 as the task id or remove the key and value.
// Note that you can only have one timer on task at a time. If you omit the task and start the timer on the project, you can only have one project level timer at a time also.
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v3/time-tracking/post-projects-api-v3-me-timers-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere" // intiger 0 if you dont want to link the timer to a task
const projectId = "projectIdHere" // intiger
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "timer": {
    "taskId": taskId,
    "projectId": projectId
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/projects/api/v3/me/timers.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
