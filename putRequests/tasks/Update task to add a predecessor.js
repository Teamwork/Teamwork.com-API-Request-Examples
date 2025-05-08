// This code sample is an example for adding a predecessor to a task. 
// Endpoint Documentation: https://apidocs.teamwork.com/docs/teamwork/v1/tasks/put-tasks-id-json
// Endpoint Url: https://${siteName}.teamwork.com/tasks/${taskId}.json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere"

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "todo-item": {
    "use-defaults": false,
    "completed": false,
    "content": "Time on task with API",
    "tasklistId": 3125477,
    "creator-id": 238860,
    "notify": false,
    "responsible-party-id": "238860",
    "start-date": "",
    "due-date": "",
    "description": "",
    "priority": "",
    "progress": 0,
    "parentTaskId": 0,
    "tagIds": "",
    "everyone-must-do": false,
    "predecessors": [
      {
        "id": 42770722,
        "name": "Make me a predecessor",
        "type": "start", // "start" = main task can not start until this predecessor is completed > "complete" = main task can not be completed until this predecessor is completed
        "status": "new",
        "parentTaskId": 0
      }
    ],
    "reminders": null,
    "commentFollowerIds": "-1",
    "changeFollowerIds": "-1",
    "grant-access-to": "",
    "private": false,
    "columnId": 0,
    "customFields": [],
    "estimated-minutes": 0,
    "pendingFileAttachments": [],
    "updateFiles": true,
    "attachments": "",
    "removeOtherFiles": true,
    "attachmentsCategoryIds": "",
    "pendingFileAttachmentsCategoryIds": "",
    "repeatOptions": {
      "selecteddays": "",
      "repeatEndDate": "noEndDate",
      "repeatsFreq": "norepeat",
      "monthlyRepeatType": "monthDay"
    }
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
