// This code sample will update multiple project health statuses, add / update status messages and notify users
// This example will loop twice based on projectIds array length
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v1/project-updates/post-projects-proj-id-update-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userIds = "userIdsHere"
const messages = ["We need to review task dates!","All good here"] // Comma separate messages based on the corresponding project
const projectHealth = [1,3] // Health for projects is represented with intigers - 1 Good, 2 At Risk, 3 Needs Attention 
const userIds = "238860" // Comma separate additional user Ids if required - Leave blank if no-one is to be notified
const projectIds = [757972,758476] //Add remove project ids as required
let loop = 0 // Loop to be used later to iterate through projects to update

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));
do{
const raw = JSON.stringify({
    "update": {
        "text": messages[loop],
        "health": projectHealth[loop] // 1 Good, 2 At Risk, 3 Needs Attention
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

fetch("https://" + siteName + "/projects/"+projectIds[loop]+"/update.json", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    loop++
} while(loop < projectIds.length);
