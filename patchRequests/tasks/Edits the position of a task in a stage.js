// This code sample will move a task into a workflow stage and set the position of the task in the stage
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/endpoints-by-object/workflows/patch-projects-api-v3-tasks-task-id-workflows-workflow-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere"
const stageId = stageIdHere; // integer
const workflowId = workflowIdHere; // integer
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "workflowId": workflowId,
  "stageId": stageId,
  "positionAfterTask": -1 //0 Bottom of stage, -1 Top of stage
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/tasks/${taskId}/workflows/${workflowId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
