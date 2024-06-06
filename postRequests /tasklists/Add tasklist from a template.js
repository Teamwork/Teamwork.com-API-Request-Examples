const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere"
const userId = "userIdHere"
const taskTempId = "taskTempIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "applyDefaultsToExistingTasks": false,
  "todo-list": {
    "pinned": false,
    "private": false,
    "isBillable": null,
    "description": "Note to apply to new list",
    "milestone-id": 0,// Milestone id here if appliciable
    "icon": "",
    "name": "Sketching and AutoCAD drawings for today",
    "grant-access-to": "",
    "todo-list-template-assignments": { // This object is for the choose later option if required.
      "Cad technician": userId // Comment this out if you have no choose later assigments
    },
    "todo-list-template-id": taskTempId,
    "todo-list-template-keep-off-weekends": true,
    "todo-list-template-notify": false,
    "todo-list-template-start-date": "20240606",// YYYYMMDD
    "new-task-defaults": {
      "change-follower-ids": "",
      "comment-follower-ids": "",
      "description": "",
      "due-date-offset": "",
      "estimated-minutes": 0,
      "grant-access-to": "0",
      "private": false,
      "responsible-party-id": "",
      "start-date-offset": "",
      "tagIds": "",
      "priority": null,
      "customFields": [],
      "column-id": 0,
      "stageId": 0,
      "reminders": []
    }
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://" + siteName + ".teamwork.com/projects/" + projectId + "/tasklists.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
