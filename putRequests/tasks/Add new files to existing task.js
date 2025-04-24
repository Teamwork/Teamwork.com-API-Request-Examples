// This code sample will add new files based on their reference number to an existing task
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/tasks/put-tasks-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = taskIdHere // Integer - Required field
const pendingFiles = ["tf_11aa547b-3314-477c-a7e4-d9040e77210f.png","tf_3c756f53-8e7e-4b6d-a186-8317023a571c.png"] // Add the file ref id as a string - comma separate for multiple files
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "todo-item": {
   "id": taskId,
    "pendingFileAttachments": pendingFiles
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
  .then((result) => console.log(result))// Successfull request = {"STATUS":"OK","assignedFileIds":["11099894","11099895"],"relativeRemindersMoved":false,"affectedTaskIds":"41856377"}
  .catch((error) => console.error(error));
