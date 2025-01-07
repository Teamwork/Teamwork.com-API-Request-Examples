// This code sample will move one or multiple tasks into a workflow stage
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/endpoints-by-object/workflows/post-projects-api-v3-workflows-workflow-id-stages-stage-id-tasks-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskIds = [taskIdsHere] // array of integers - comma separated
const stageId = stageIdHere; // integer
const workflowId = workflowIdHere; // integer
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "taskIds": taskIds
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/workflows/${workflowId}/stages/${stageId}/tasks.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
