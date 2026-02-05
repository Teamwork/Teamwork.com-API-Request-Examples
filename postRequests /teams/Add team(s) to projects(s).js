// This code sample will add a team or teams to one or more projects
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const teamIds = teamIdsHere; // String - comma separate if you have multiple teams to add
const projectIds = projectIdsHere; // String - comma separate if you have projects to add the team(s) to
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "teamIds": teamIds,
  "projectIds": projectIds
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/teams/defaultprojects.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
