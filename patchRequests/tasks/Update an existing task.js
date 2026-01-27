// This code sample will update a task with the following information
// > assign to a user or users if more are added 
// > notify user(s) 
// add estimated time to task
// > put task on a workflow stage
// > add tags
// > This will add a new custom field value to a custom field - it is important to know that the payload for the custom field object must contain existing values for custom field already populated. The payload you pass is what will exist on the task after you update so this may delete existing custom fields if they are not included
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v3/tasks/patch-projects-api-v3-tasks-task-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = [67890, 45678] // Comma separate additional user Ids if required - Leave blank if no-one is to be assigned
const commentFollowerId = [12345]; // Comma separate comment follower user Ids if required - Leave blank if no-one is to be added as a follower
const changeFollowerId = [45678]; // Comma separate change follower user Ids if required - Leave blank if no-one is to be added as a follower
const tagIds = [453455,767657];// Comma separate tagIds if required - Leave blank no tags are required
const stageId = 54321; // integer
const workflowId = 98765; // integer // Leave blank if you are not setting a column for the task
const estimatedTime = 90; // integer // Leave blank if you are not setting estimated time for the task
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "task": {
    "name": "Creating a task from the Teamwork.com API - work now",
    "tagIds": tagIds,
    "estimatedMinutes": estimatedTime,
    "assignees": {
      "userIds": userId,
      "teamIds": [],
      "companyIds": []
    },
    "changeFollowers": {
      "userIds": changeFollowerId,
      "teamIds": [],
      "companyIds": []
    },
    "commentFollowers": {
      "userIds": commentFollowerId,
      "teamIds": [],
      "companyIds": []
    },
    "priority": "medium",
    "startAt": "2024-04-16",
    "dueAt": "2024-04-24",
    "description": "This task was created with the V3 [Create a task endpoint](https://apidocs.teamwork.com/docs/teamwork/v3/tasks/post-projects-api-v3-tasklists-tasklist-id-tasks-json)",
    /* "customFields": [
      {
        "customFieldId": 2794,
        "value": "QR5654"
      },
      {
        "customFieldId": 6050,
        "value": "https://apidocs.teamwork.com/docs/teamwork",
        "urlTextToDisplay": "Teamwork.com API"
      }
    ] */// This will work for adding new custom field values, if the custom field does not already have a value - note that you must map your existing custom field values for the other custom fields already populated
  },
  "taskOptions": {
    "notify": true
  },
  "workflows": {
    "positionAfterTask": 0, // 0 to add the task to the bottom of the column, -1 to add the task to the top of the column and :taskId so that the task goes under the specified id
    "stageId": stageId,
    "workflowId": workflowId
  },//Remove this object if you are not setting a workflow stage

});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/tasks/${taskId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
