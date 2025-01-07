// This code sample will copy a specified tasklist over to another project or the existing project
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/task-lists/put-tasklist-id-copy-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const projectId = projectIdHere; // integer 
const tasklistId = "tasklistIdhere";
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "projectId": projectId,
  "includeCompletedTasks": 0 // 0 = Don't include completed tasks, 1 = copy completed tasks and make them active
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/tasklist/${tasklistId}/copy.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
