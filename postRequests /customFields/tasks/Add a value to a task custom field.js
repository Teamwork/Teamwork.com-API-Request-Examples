// This code samples shows how to add a value to a task custom field.
// Required fields: taskId for URL path,customfieldId and value for request body
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/post-projects-api-v3-tasks-task-id-customfields-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const customfieldId = customfieldIdhere; // integer - Task custom field id
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "customfieldTask": {
    "customfieldId": customfieldId,
    "value": "Value goes here"// "text-short" based field
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/tasks/${taskId}/customfields.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
