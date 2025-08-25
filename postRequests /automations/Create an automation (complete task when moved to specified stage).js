// This code sample will create an automation for when a task gets moved into the stage
// Trigger: When a task moves into the specified stage on the selected projects
// Action: The task is marked as complete with an additional flag to add a comment to notify task followers 
// Endpoint documentation: Not publically documented
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = 876544;// int value which must be a project id
const workflowId = 12345 // int value which must be a workflow id
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "schema": {
    "trigger": {
      "scope": "projects",
      "entity": "task",
      "name": "workflow_stage_changed",
      "conditions": [
        {
          "name": "projects.task.workflow_stage_changed",
          "params": {
            "workflowId": workflowId,
            "workflowStageIdFrom": null,
            "workflowStageIdTo": 56789, //int which can be the id for the stage used for the trigger
            "projectId": projectId
          }
        }
      ],
      "additionalConditions": []
    },
    "actions": [
      {
        "name": "complete",
        "scope": "projects",
        "entity": "task",
        "params": {
          "shouldAddCompletedComment": true
        }
      }
    ]
  },
  "description": "When <strong>Stage changes</strong> from <strong>any</strong> to <strong>Completed</strong>, <strong>Complete task</strong>",
  "customDescription": "",
  "status": "active"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/automations/api/v1/automation.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
