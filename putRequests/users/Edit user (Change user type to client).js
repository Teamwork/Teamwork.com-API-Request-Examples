// This code sample will update the seleted user based on their userId and change thier user type to client user
// Note that client users can not be invited to the owner company
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/people/post-people-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdHere" 
const companyId = 0 
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "person": {
      "email-address": "d.mackey@teamwork.com",
      "first-name": "Dan",
      "last-name": "Mackey",
      "company-id": companyId,
      "sendInvite": true,     
      "isClientUser": true,
      "user-type": "account"
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/people/${userId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
