// This code sample will apply a workflow to an existing project
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/endpoints-by-object/workflows/post-projects-api-v3-projects-project-id-workflows-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = 54321; // integer
const workflowId = 1499; // integer

myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "workflow": {
    "id": workflowId
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/projects/${projectId}/workflows.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
