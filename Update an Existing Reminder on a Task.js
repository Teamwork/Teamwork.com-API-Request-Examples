const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const taskId = "taskIdHere" 
const userId = "userIdHere"  
const reminderId = "reminderIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
    "reminder": {
        "note": "Hey, don't forget about me!",
        "type": "EMAIL",//SMS,PUSH
        "date-time-utc": "2024-10-07T10:15:45Z",//YYYY-MM-DD
        "user-id": [
            userId
        ],
        "isRelative": false,//Set to true to follow task due date
        "id": reminderId,//Reminder Id
        "peopleAssigned": false,//true when reminder is set to all task assignees
        "assignToMultiple": false,
        "assigneeDetails": [
            {
                "id": userId,
                "label": "User Name",
                "firstName": "userFirstName",
                "lastName": "userLastName"
            }
        ],
        "usingOffSetDueDate": false
    }
});

const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

fetch("https://" + siteName + ".teamwork.com/tasks/" + taskId + "/reminders/" + reminderId + ".json", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
