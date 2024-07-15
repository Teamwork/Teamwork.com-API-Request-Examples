const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userIds = "userIdsHere"
const taskListId = "tasklistIdHere" // Required field
const userId = "757564" // Comma separate additional user Ids if required - Leave blank if no-one is to be notified
const columnId = "columnIdHere" // Leave blank if you are not setting a column for the task
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "todo-item": {
    "use-defaults": false,
    "completed": false,
    "content": "Creating a task from the Teamwork.com API",
    "tasklistId": taskListId,
    "creator-id": 0,
    "notify": false,
    "responsible-party-id": userId,
    "start-date": "20240715", // YYYYMMDD
    "due-date": "20240717", // YYYYMMDD
    "description": "This task was created with the V3 [Create a task endpoint](https://apidocs.teamwork.com/docs/teamwork/v3/tasks/post-projects-api-v3-tasklists-tasklist-id-tasks-json)",
    "priority": "",
    "progress": 0,
    "parentTaskId": 0,
    "tagIds": "",
    "everyone-must-do": false,
    "predecessors": [],
    "reminders": null,
    "columnId": columnId,
    "commentFollowerIds": "-1",
    "changeFollowerIds": "-1",
    "grant-access-to": "",
    "private": false,
    "customFields": [
      {
        "customFieldId": 2794,
        "value": "QR5654"
      },
      {
        "customFieldId": 3854,
        "value": "https://apidocs.teamwork.com/docs/teamwork",
        "urlTextToDisplay": "Teamwork.com API"
      }
    ],
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
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/tasklists/"+taskListId+"/tasks.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
