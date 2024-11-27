// This code sample will update a task and add a value to a new custom field
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/tasks/put-tasks-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "todo-item": {
    "customFields": [
      {
        "customFieldId": 2794, // Id for the custom field
        "value": "New field data"// Add a value for the custom field
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
console.log("https://" + siteName + ".teamwork.com/tasks/" + taskId + ".json")

fetch("https://" + siteName + ".teamwork.com/tasks/" + taskId + ".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
