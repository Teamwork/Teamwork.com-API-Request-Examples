// This code sample will create a project specific workflow
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/endpoints-by-object/workflows/post-projects-api-v3-workflows-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = 0;// int value which must match the project id for which the workflow is being applied
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "workflow": {
    "name": "My project specific workflow",
    "projectId": projectId,
    "projectSpecific": true
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/workflows.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
