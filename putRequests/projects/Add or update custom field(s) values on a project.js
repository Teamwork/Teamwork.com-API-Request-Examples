// This code sample will add or update custom fields on a project
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v1/projects/put-projects-id-json
// To get project custom field id's use: https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/get-projects-api-v3-customfields-json
// Caveat: If you have existing custom fields on your project and you want them to stay, you must include that data in the request body or they will be removed
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "project": {
    "customFields": [
      {
        "customFieldId": 2301, 
        "type": "number-integer",
        "value": "1234567"
      },
      {
        "customFieldId": 3860,
        "type": "dropdown",
        "value": "Pending"
      }
    ]
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://" + siteName + ".teamwork.com/projects/"+projectId+".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
