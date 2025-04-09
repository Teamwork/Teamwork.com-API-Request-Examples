//https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/post-projects-api-v3-tasks-task-id-customfields-bulk-update-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
    "customfieldTasks": [
        {
            //sample Text based Field
            "id": 86074,// This ID is for the value of the custom field which is unique to this task only
            "customfieldId": 2794,// This ID is for the custom field entity which is a site wide id
            "value": "Value edited by API"
            //sample Text based Field
        },
        {
            //sample Dropdown based Field
            "id": 86073,// This ID is for the value of the custom field which is unique to this task only
            "customfieldId": 2558,// This ID is for the custom field entity which is a site wide id
            "value": "Submitted"
        }, 
        {
            //sample Integer based Field
            "id": 86075,// This ID is for the value of the custom field which is unique to this task only
            "customFieldId": 2740,// This ID is for the custom field entity which is a site wide id
            "value": 897
        },
        {
            //sample Date based Field
            "id": 86076,// This ID is for the value of the custom field which is unique to this task only
            "customFieldId": 2739,// This ID is for the custom field entity which is a site wide id
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

fetch("https://" + siteName + ".teamwork.com/projects/api/v3/tasks/" + taskId + "/customfields/bulk/update.json", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
