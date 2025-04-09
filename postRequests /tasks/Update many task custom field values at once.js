// This script will update all of the custom fields in the payload based on the custom field and custom field value id's on the specified task
// Endpoint Documentation - https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/post-projects-api-v3-tasks-task-id-customfields-bulk-update-json
// Supporting endpoint documantation:
// - Get all customfields for tasks - https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/get-projects-api-v3-customfields-json > Make sure you add the entities param to filter task custom fields only
//     - ie: {Domain}/projects/api/v3/customfields.json?page=1&pageSize=50&entities=task
// - Task custom field values - https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/get-projects-api-v3-tasks-task-id-customfields-json > this endpoint can be used to get the id for the value of custom fields populates for a task

const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
    "customfieldTasks": [
        {
            //sample Text based Field
            "id": 86074,// This ID is for the value of the custom field which is unique to this task only
            "customfieldId": 2794,// "customfieldId" is for the custom field entity which is a site wide id
            "value": "Value edited by API"
            //sample Text based Field
        },
        {
            //sample Dropdown based Field
            "id": 86073,// This ID is for the value of the custom field which is unique to this task only
            "customfieldId": 2558,// "customfieldId" is for the custom field entity which is a site wide id
            "value": "Submitted"
        }, 
        {
            //sample Integer based Field
            "id": 86075,// This ID is for the value of the custom field which is unique to this task only
            "customFieldId": 2740,// "customfieldId" is for the custom field entity which is a site wide id
            "value": 897
        },
        {
            //sample Date based Field
            "id": 86076,// This ID is for the value of the custom field which is unique to this task only
            "customFieldId": 2739,// "customfieldId" is for the custom field entity which is a site wide id
            "value": "2024-05-13"//YYYY-MM-DD
        }
    ]
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/tasks/${taskId}/customfields/bulk/update.json`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
