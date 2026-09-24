// This code sample will update the specified projects, project owner and add custom field values
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v1/projects/put-projects-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const projectId = projectIdHere;// int
const projectOwnerId = "projectOwnerIdHere";
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = {
  "project": {
    "projectOwnerId": projectOwnerId,
    "customFields": [
      {
        "customFieldId": 6771, // Refer to the Get all custom fields endpoint (append ?entities=project onto the endpoint URL for project level fields only) - https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/get-projects-api-v3-customfields-json
        "type": "text-short",
        "value": "TR453627"
      },
      {
        "customFieldId": 6767,
        "type": "dropdown",
        "value": "IL"
      }
    ]
  }
};

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: JSON.stringify(raw),
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/${projectId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
