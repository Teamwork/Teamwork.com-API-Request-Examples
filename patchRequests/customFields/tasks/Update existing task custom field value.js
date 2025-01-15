// This code sample will update an existing custom field value for the specified custom field
// This will update a single custom field - multiple exapmples are added so please comment out what you dont need and only have one request body
// The URL is made up of a task id (taskId) as well as the custom field value id (customFieldId). The custom field id is the site level id (customfieldId) for the custom field. 
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/patch-projects-api-v3-tasks-task-id-customfields-custom-field-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere"
const customFieldId = "customFieldIdHere"; // This is the id for the value of the custom field - (notice the capital F in field!)
const customfieldId = customfieldIdhere; // Integer - this is the id of the custom field
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

// String custom field
const raw = JSON.stringify({
  "customfieldTask": {
    "customfieldId": customfieldId,
    "value": "EV35464"
  }
});

// Number custom field
/* const raw = JSON.stringify({
  "customfieldTask": {
    "customfieldId": customfieldId,
    "value": 300453
  }
}); */

// URL custom field
/* const raw = JSON.stringify({
  "customfieldTask": {
    "customfieldId": customfieldId,
    "value": "https://github.com/Teamwork/Teamwork.com-API-Request-Examples/blob/main/postRequests%20/tasks/Update%20many%20task%20custom%20field%20values%20at%20once.js",
    "urlTextToDisplay": "Update many task custom field values at once"
  }
}); */

// Dropdown Option
/* const raw = JSON.stringify({
  "customfieldTask": {
    "customfieldId": customfieldId,
    "value": "Option 1"
  }
}); */

// Checkbox custom field
/* const raw = JSON.stringify({
  "customfieldTask": {
    "customfieldId": 4844,
    "value": false
  }
}); */
const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/tasks/${taskId}/customfields/${customFieldId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));


  
