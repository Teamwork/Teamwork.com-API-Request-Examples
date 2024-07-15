// This code samples shows how to update a projects health, apply an associated update message and notify a user
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v1/project-updates/post-projects-proj-id-update-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const message = "messageHere" // Leave blank if you do not want to add a message
const userIds = "userIdsHere"
const projectId = ProjectIdHere

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
    "update": {
        "text": message,
        "health": 1 // 1 Good, 2 At Risk, 3 Needs Attention
    },
    "notifyIds": userIds,
    "notifyCurrentUser": true
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

fetch("https://" + siteName + "/projects/"+projectId+"/update.json", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
