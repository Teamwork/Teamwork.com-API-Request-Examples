// This code sample will change the order of features and amount of visible tabs on a project
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v3/projects/put-projects-api-v3-projects-project-id-featureorder-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "dashboard": 0,
  "list": 1,
  "board": 2,
  "messages": 3,
  "files": 4,
  "time": 5,
  "notebooks": 6,
  "finance": 7,
  "links": 8,
  "comments": 9,
  "people": 10,
  "settings": 11,
  "tickets": 12,
  "table": 13,
  "milestones": 14,
  "proofs": 15,
  "gantt": 16,
  "forms": 17,
  "risks": 18,
  "numVisibleTabs": 10
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/projects/api/v3/projects/"+projectId+"/featureorder.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
