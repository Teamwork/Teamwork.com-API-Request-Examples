// This code sample will copy an existing form to another project or multiple projects
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const hostProjectId = hostProjectIdHere; // Int
const projectIds = [projectIdsHere]; // Int array - comma separate if you want to copy form to multiple projects ie: [9192983,9846352]
const formId = "formIdHere"; // String
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "form": {
    "hostObject": {
      "id": hostProjectId,
      "type": "projects"
    },
    "title": "Publish form via API with token included",
    "copyAssignees": false,
    "generateToken": true,
    "projectIds": projectIds
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/forms/${formId}/copy.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
