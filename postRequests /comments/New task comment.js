const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere"
const userId = "userIdHere" 
const notifyUserId = "notifyUserIdHere"
const notifyUserHandle = "notifyUserHandleHere"//ie:@marcc
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "objectId": taskId,
  "objectType": "task",
  "comment": {
    "body": "Adding a comment via API.\ncc "+notifyUserHandle,
    "author-id": userId,
    "content-type": "TEXT",
    "notify": notifyUserId,//Add empty quotes when no notification is required
    "notify-current-user": false,
    "skipNotifications": false,
    "remove-other-files": true,
    "grant-access-to": "",
    "private": 0,
    "pendingFileAttachments": [],
    "updateFiles": true,
    "fileIds": "",
    "attachmentsCategoryIds": "",
    "pendingFileAttachmentsCategoryIds": ""
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/tasks/"+taskId+"/comments.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
