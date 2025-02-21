const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const tasklistId = "tasklistIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "todo-list": {
    "pinned": true // Set to false to unpion the tasklist
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/tasklists/${tasklistId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
