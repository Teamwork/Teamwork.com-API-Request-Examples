const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdhere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "person": {
    "lengthOfDay": 7,
    "workingHours": {
      "entries": [
        {
          "weekday": "sunday",
          "taskHours": 0
        },
        {
          "weekday": "monday",
          "taskHours": 7
        },
        {
          "weekday": "tuesday",
          "taskHours": 7
        },
        {
          "weekday": "wednesday",
          "taskHours": 7
        },
        {
          "weekday": "thursday",
          "taskHours": 7
        },
        {
          "weekday": "friday",
          "taskHours": 7
        },
        {
          "weekday": "saturday",
          "taskHours": 0
        }
      ]
    }
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/people/"+userId+".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
