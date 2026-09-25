// This code sample will add and or remove users from the specified project based on the ids passed into each object
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v1/permissions/put-projects-id-people-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const addUserIds = "userIdsHere" // Comma separate for multiple users
const removeUserIds = "userIdsHere" // Comma separate for multiple users
const projectId = "ProjectIdHere"

const raw = JSON.stringify({
  "add": {
    "userIdList": addUserIds
  },
  "remove": {
    "userIdList": removeUserIds
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}/projects/${projectId}/people.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
