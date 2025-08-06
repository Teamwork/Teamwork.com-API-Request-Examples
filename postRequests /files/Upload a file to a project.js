// This code sample is an example of uploading a file to a project. 
// Endpoint Url: https://${siteName}.teamwork.com/projects/${projectId}/files.json
// Endpoint Doc: https://apidocs.teamwork.com/docs/teamwork/v1/files/post-projects-id-files-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere";
const categoryId = "categoryIdHere"// Use 0 when you dont want a linked category
const fileRef = "fileRefIdHere"

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "file": {
    "pendingFileRef": `${fileRef}`,
    "notify": "ALL",
    "notify-current-user": false,
    "description": "",
    "projectId": projectId,
    "category-id": categoryId, 
    "autoNewVersion": true,
    "grant-access-to": "",
    "private": 0
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/${projectId}/files.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
