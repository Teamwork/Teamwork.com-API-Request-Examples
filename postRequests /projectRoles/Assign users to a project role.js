// This code sample will assign a project role to the list of userIds provided
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const userIds = [userIdsHere]; // Int array- comman separate if you are assigning the role to multiple users ie: [468281,469406]
const jobRoleId = jobRoleIdHere; // string
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "users": userIds
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/jobroles/${jobRoleId}/people.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
