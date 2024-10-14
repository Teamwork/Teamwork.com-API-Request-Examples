// This code sample will show and hide features on a specified project > 1 = true, 0 = false
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v1/projects/put-projects-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "project": {
    "use-board": 1,
    "use-table": 0,
    "use-milestones": 0,
    "use-forms": 0,
    "use-tickets": 0,
    "use-messages": 1,
    "use-gantt": 0,
    "use-proofs": 0,
    "use-riskregister": 0,
    "use-finance": 1,
    "use-comments": 1,
    "use-time": 1,
    "use-links": 1,
    "use-files": 1,
    "use-notebook": 1,
    "use-list": 1
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/projects/"+projectId+".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
