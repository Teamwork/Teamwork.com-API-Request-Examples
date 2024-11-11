// This code sample will create an invoice expense which can added to an invoice if required
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/expenses/post-expenses-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "expense": {
    "name": "VM access time",
    "description": "Access to VM for 1 hour",
    "date": "20241111",
    "cost": 275,
    "projectType": "normal"
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/projects/"+projectId+"/expenses.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
