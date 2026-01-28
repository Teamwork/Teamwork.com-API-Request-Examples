// This code sample is an example of uploading a file to an existing task. 
// Endpoint Url: https://${siteName}.teamwork.com/tasks/${taskId}/files.json
// Endpoint Doc: https://apidocs.teamwork.com/docs/teamwork/v1/files/post-tasks-id-files-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere";
const fileRef = "fileRefIdHere"

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "task": {
    "pendingFileAttachments": ["tf_680e8ba1-2e17-4fd0-a42d-2c082cd633c1"],
    "updateFiles": true,
    "removeOtherFiles": true,
    "attachments": "",
    "attachmentsCategoryIds": "",
    "pendingFileAttachmentsCategoryIds": "0"
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/tasklists/${taskId}/files.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
