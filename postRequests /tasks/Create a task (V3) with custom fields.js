const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userIds = "userIdsHere"
const taskListId = "tasklistIdHere" // Required field
const userId = "757564" // Comma separate additional user Ids if required - Leave blank if no-one is to be notified
const columnId = "columnIdHere"// Leave blank if you are not setting a column for the task
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "task": {
    "tasklistId": taskListId,
    "name": "Creating a task from the Teamwork.com API1",
    "assignees": {
      "userIds": [
        userId
      ]
    },
    "priority": "medium",
    "startAt": "2024-04-16",
    "dueAt": "2024-04-24",
    "description": "This task was created with the V3 [Create a task endpoint](https://apidocs.teamwork.com/docs/teamwork/v3/tasks/post-projects-api-v3-tasklists-tasklist-id-tasks-json)",
    "customFields": [
        {
          "customFieldId": 2794,
          "value": "QR5654"
        },
        {
          "customFieldId": 3854,
          "value": "https://apidocs.teamwork.com/docs/teamwork",
          "urlTextToDisplay": "Teamwork.com API"
        }
      ]
  },
  "taskOptions" :{
      "notify": true
  },
  "card": {
      "columnId": columnId
  },//Remove this object if you are not setting a column
  
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/projects/api/v3/tasklists/"+taskListId+"/tasks.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
