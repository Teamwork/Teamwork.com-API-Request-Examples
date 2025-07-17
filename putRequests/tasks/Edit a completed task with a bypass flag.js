// This code sample is an example for updateing the assigned user and due date while bypassing the completed status. 
// Endpoint Url: https://${siteName}.teamwork.com/tasks/${taskId}.json
// endpoint Doc: https://apidocs.teamwork.com/docs/teamwork/v1/tasks/put-tasks-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere";

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "todo-item": {
    "id": taskId,
    "due-date": "20250717",
    "responsible-party-id": "238860",
    "completed": false //flagging this as false will allow for an update to be made on a completed task
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/tasks/${taskId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
