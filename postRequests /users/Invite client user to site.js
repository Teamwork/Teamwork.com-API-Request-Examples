// This code sample will invite a client user to your site
// There is also logic to add the client user to projects in the specified company
// Note that client users can not be invited to the owner company
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/people/post-people-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const companyId = companyIdHere // integer
const projectIds = "projectIdsHere" // comma separated list of project ids - leave enpty string if no projects are required at time of invite
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "person": {
    "email-address": "firstNameLastName@example.com",
    "user-name": "firstNameLastName@example.com",
    "first-name": "firstName",
    "last-name": "lastName",
    "company-id": companyId,
    "sendInvite": true,// Set to false you do not want an invite to go out straight away
    "sendInviteWithMessage": "",
    "receiveDailyReports": true,
    "administrator": false,
    "canAddProjects": true,
    "canManagePeople": false,
    "canAccessAllProjects": false,
    "accessProjectIds": projectIds,
    "accessProjectsCompanyIds": "",
    "setProjectAdmin": false,
    "getUserDetails": true,
    "isClientUser": true,// Client user flag
    "continueIfUserExists": false,
    "user-type": "account",
    "canCreateProjects": false,
    "canAddUsers": false
  },
  "assignDefaultProjects": false
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/people.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
