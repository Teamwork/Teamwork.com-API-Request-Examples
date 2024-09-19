const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "taskIdHere"
const customFieldId = "customFieldIdHere";// This ID is the id for the existing value for the custom field
const customfieldId = customfieldIdHere;// integer - This is the ID of the custom field entity. This ID is at site level and will be the same for each project.
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "customfieldProject": {
    "customfieldId": customfieldId,
    "value": 1000
  }
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://" + siteName + ".teamwork.com/projects/api/v3/projects/" + projectId + "/customfields/" + customFieldId + ".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
