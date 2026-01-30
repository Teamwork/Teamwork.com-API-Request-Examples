// This code sample will update the Time logging project setting on multiple projects
// This example will loop twice based on projectIds array length - extend the array to suit your process
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v1/projects/put-projects-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectIds = [757972,758476] //Add remove project ids as required
let loop = 0 // Loop to be used later to iterate through projects to update

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

do{
const raw = JSON.stringify({
    "project": {
        "timelogRequiresTask": true
    }
});

const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

fetch(`https://${siteName}/projects/${projectIds[loop]}.json`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    loop++
} while(loop < projectIds.length);
