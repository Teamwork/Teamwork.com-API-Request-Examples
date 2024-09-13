// This code sample will create a task > assign to a user or users if more are added > notify user(s) > put task on a column if an id is supplied
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v3/tasks/post-projects-api-v3-tasklists-tasklist-id-tasks-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskListId = taskListIdHere//integer
const userId = userIdHere//integer
const columnId = columnIdHere//integer
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "task": {
    "tasklistId": taskListId,
    "name": "Creating a task from the Teamwork.com API",
    "assignees": {
      "userIds": [
        userId
      ]
    },
    "priority": "medium",
    "startAt": "2024-04-16",
    "dueAt": "2024-04-24",
    "description": "[Create a task endpoint](https://apidocs.teamwork.com/docs/teamwork/v3/tasks/post-projects-api-v3-tasklists-tasklist-id-tasks-json)"
  },
  "taskOptions" :{
      "notify": true // Set to false if no notification is required
  },
  "card": {
      "columnId": columnId
  }//Remove this object if you are not setting a column
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
