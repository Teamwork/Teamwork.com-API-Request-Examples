const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskListId = "taskListIdHere"
const taskId = "taskIdHere"
const userId = "userIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "todo-item": {
    "use-defaults": false,
    "completed": false,
    "content": "[8273746] - New task name",
    "tasklistId": taskListId,
    "creator-id": userId,
    "notify": false,
    "responsible-party-id": userId,//replace id with blank quotes to remove assignee
    "start-date": "",
    "due-date": "20240731",//YYYYMMDD
    "description": "",
    "priority": "low",//medium,high or none
    "progress": 0,
    "parentTaskId": 0,
    "tagIds": "",//add comma separate tagId's if appliciable
    "everyone-must-do": false,
    "predecessors": [],
    "reminders": null,
    "columnId": 0,//Replace with your respective columnId id applicable - 0 for no column
    "commentFollowerIds": "",//add comma separate userId's for followers
    "changeFollowerIds": "",//add comma separate userId's for followers
    "grant-access-to": "",
    "private": false,
    "customFields": [],
    "estimated-minutes": 105,//Estimated time in minutes
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

fetch("https://"+siteName+".teamwork.com/tasks/"+taskId+".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
