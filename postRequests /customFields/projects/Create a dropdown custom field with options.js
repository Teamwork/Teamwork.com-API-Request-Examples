// This code sample is an example for adding a project lebvel dropdown type custom field. 
// Endpoint Documentation: https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/post-projects-api-v3-customfields-json
// Endpoint Url: https://${siteName}.teamwork.com/projects/api/v3/customfields.json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "customfield": {
    "name": "Project Type",
    "type": "dropdown",
    "entity": "project",
    "description": "Project Type description",
    "options": {
      "choices": [
        {
          "color": "#895EF7",
          "value": "General Admin"
        },
        {
          "color": "#4CD5E3",
          "value": "Billable"
        },
        {
          "color": "#FF7641",
          "value": "Archiving"
        }
      ]
    }
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/customfields.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
