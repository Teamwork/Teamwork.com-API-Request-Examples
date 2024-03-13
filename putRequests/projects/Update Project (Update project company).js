//https://apidocs.teamwork.com/docs/teamwork/v1/projects/put-projects-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere"
const companyId = "companyIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));


const raw = JSON.stringify({
  "project": {
    "companyId": companyId
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://" + siteName + ".teamwork.com/projects/" + projectId + ".json?", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
