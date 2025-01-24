const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere"
const userId = userIdHere // int
const tasklistId = tasklistIdHere // integer
const stageId = stageIdHere; // integer
const workflowId = workflowIdHere; // integer
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "task": {
    "name": "Task added directly to a stage again",
    "description": "My description here",
    "tasklistId": tasklistId,
    "startAt": "2025-01-24",
    "dueAt": "2025-01-27",
    "priority": "medium",
    "estimatedMinutes": 150,
    "assignees": {
      "userIds": [
        userId
      ],
      "teamIds": [],
      "companyIds": []
    }
  },
  "workflows": {
    "positionAfterTask": 0,
    "stageId": stageId,
    "workflowId": workflowId
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/tasklists/${tasklistId}/tasks.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
