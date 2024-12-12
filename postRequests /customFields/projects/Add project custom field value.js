// This code samples shows how to add a project custom field value.
// Required fields: projectId for URL path,customfieldId and value for request body
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/post-projects-api-v3-projects-project-id-customfields-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const companyId = "projectIdHere"
const customfieldId = customfieldIdhere; // integer - Project custom field id

const raw = JSON.stringify({
  "customfieldProject": {
    "countryCode": "",
    "currencySymbol": "",
    "customfieldId": customfieldId,
    "urlTextToDisplay": "",
    "value": 12345
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/projects/${projectId}/customfields.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
