//https://apidocs.teamwork.com/docs/teamwork/v1/tasks/post-tasklists-id-tasks-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskListId = "taskListIdHere"
const userId = "userIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "todo-item": {
    "use-defaults": false,
    "completed": false,
    "content": "Repeat task every 3 days - created via API",
    "tasklistId": taskListId,
    "creator-id": 0,
    "notify": true,
    "responsible-party-id": userId,
    "start-date": "",
    "due-date": "20240424",//yyyymmdd
    "description": "Repeat task every 3 days - created via API for research",
    "priority": "",
    "progress": 0,
    "parentTaskId": 0,
    "tagIds": "",
    "everyone-must-do": false,
    "predecessors": [],
    "reminders": null,
    "columnId": 0,
    "commentFollowerIds": "-1",
    "changeFollowerIds": "-1",
    "grant-access-to": "",
    "private": false,
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
      "repeatsFreq": "everyxdays",
      "monthlyRepeatType": "monthDay",
      "duration": "3"//Number of days between repeat tasks
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
