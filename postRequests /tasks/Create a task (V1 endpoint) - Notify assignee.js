// This code sample will create a task with the following information
// > assign to a user or users if more are added 
// > notify user(s) (Notifications should appear in email as well as user inbox on TW)
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/tasks/post-tasklists-id-tasks-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"; // ie: domain.teamwork.com
const tasklistId = tasklistIdHere // Required field
const userIds = "userIdsHere"; // Comma separate additional user Ids if required - Leave blank if no-one is to be notified
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));


const raw = JSON.stringify({
  "todo-item": {
    "id": 0,
    "content": "User should be notified via email as well as inbox",
    "start-date": "",
    "due-date": "",
    "notify": true,
    "progress": 0,
    "estimated-minutes": 0,
    "priority": "none",
    "description": "Sent via API",
    "tagIds": "",
    "taskListId": tasklistId,
    "responsible-party-id": userIds,
    "grant-access-to": "0",
    "private": false,
    "pendingFileAttachments": "",
    "changeFollowerIds": "",
    "commentFollowerIds": "",
    "completeFollowerIds": "",
    "repeatOptions": {
      "repeatsFreq": "norepeat",
      "repeatEndDate": "noEndDate"
    },
    "attachments": "",
    "updateFiles": true,
    "removeOtherFiles": true
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}/tasklists/${tasklistId}/tasks.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
