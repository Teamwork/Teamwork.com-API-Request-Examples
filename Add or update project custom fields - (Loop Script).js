// This code sample will add or update custom fields on a project
// This example will loop twice based on projectIds array length
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v1/projects/put-projects-id-json
// To get project custom field id's use: https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/get-projects-api-v3-customfields-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const cField1 = ["1234567","567890"] // Data source for custom field 1 > For this scenario this is a number type custom field 
const cField2 = ["Pending", "Paid"] // Data source for custom field 2 > For this scenario this is a dropdown type custom field > real values from your own dropdown fields are required
const projectIds = [455314,732893] // Add remove project ids as required for your site
let loop = 0 // Loop to be used later to iterate through projects to update

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));
do{
const raw = JSON.stringify({
  "project": {
    "customFields": [
      {
        "customFieldId": 2301, // Change the custom field id to suit the custom field from your site
        "type": "number-integer",
        "value": cField1[loop]
      },
      {
        "customFieldId": 3860, // Change the custom field id to suit the custom field from your site
        "type": "dropdown",
        "value": cField2[loop]
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

fetch("https://" + siteName + ".teamwork.com/projects/"+projectIds[loop]+".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  loop++
} while(loop < projectIds.length);
