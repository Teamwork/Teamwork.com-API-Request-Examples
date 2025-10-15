// This code sample will create a project with users, tags, company, a project category, assign a workflow and two custom fields
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/projects/post-projects-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const companyId = "companyIdHere"; // integer
const categoryId = "categoryIdHere"; // intiger 0 if you dont want to assign a category for the project
const userIds = "userIdsHere"; // Comma separate additional user Ids if required - Leave blank string if no-one is to be notified
const projectOwnerId = "projectOwnerIdHere"; // Leave blank if you are not setting a column for the task
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "project": {
    "description": "[Create a project](https://apidocs.teamwork.com/docs/teamwork/v1/projects/post-projects-json) endpoint",
    "companyId": companyId,
    "name": "Create a project with API1",
    "tagIds": "126786,57502", // Comma separate additional tag Ids if required - Leave blank string if you dont want a tag
    "grant-access-to": "0",
    "private": false,
    "category-id": categoryId,
    "people": userIds,
    "projectOwnerId": projectOwnerId,
    "customFields": [
      {
        "customFieldId": 2586, // Refer to the Get all custom fields endpoint (append ?entities=project onto the endpoint URL for project level fields only) - https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/get-projects-api-v3-customfields-json
        "type": "text-short",
        "value": "TR453627"
      },
      {
        "customFieldId": 3860, // Refer to the Get all custom fields endpoint (append ?entities=project onto the endpoint URL for project level fields only) - https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/get-projects-api-v3-customfields-json
        "type": "dropdown",
        "value": "Paid"
      },
      {
      "customFieldId": 6050,
        "value": "https://apidocs.teamwork.com/docs/teamwork",
        "urlTextToDisplay": "Teamwork.com API"
      }
    ], // Removed custom field objects from customFields array if there are no custom fields to be applied ie: "customFields": [],
    "isBillable": true, // Set to false if you want time to be flagged as not billable by default
    "projectType": "normal",
    "workflowId": 1499 // Add workflow id here - comment out if you dsont want a workflow to be applied to the the project 
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/projects.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
