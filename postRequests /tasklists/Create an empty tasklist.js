// This code sample will create an empty tasklist - this also includes the running person icon in the title
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/task-lists/post-projects-id-tasklists-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "applyDefaultsToExistingTasks": false,
  "todo-list": {
    "private": false,
    "isBillable": null,
    "description": "New task list created with icon in the title",
    "milestone-id": 0,
    "icon": "🏃",// simply copy an icon (for this scenario person running) here fo it to appear in your task list title - comment out if an icon is not required
    "name": "Sprint 92 - 1/21-2/3",
    "grant-access-to": "",
    "new-task-defaults": {
      "change-follower-ids": "",
      "comment-follower-ids": "",
      "complete-follower-ids": "",
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

fetch(`https://${siteName}.teamwork.com/projects/${projectId}/tasklists.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
