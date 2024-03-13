const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "person": {
    "notifyOnTaskComplete": true,
    "notify-on-added-as-follower": true,
    "soundAlertsEnabled": true,
    "notify-on-status-update": true,
    "textFormat": "TEXT",
    "useShorthandDurations": true,
    "userReceiveNotifyWarnings": true,
    "userReceiveMyNotificationsOnly": true
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
