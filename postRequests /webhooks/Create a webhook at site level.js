const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const webhookEvent = "TASK.CREATED";//Add your desired wbehook event here - ie: TASK.UPDATED, COMMENT.CREATED - Check out our webhook events guide for a full list: https://apidocs.teamwork.com/guides/teamwork/webhook-events
const webhookUrl = "webhookUrlHere";// Url for where you would like the webhook payload to be sent ie: https://script.google.com/a/teamwork.com/macros/s/AKfycbzVjDmFeq0u6cfYkFUSazRewr8efg8scfv8sdf8/exec
const apiToken = "userApiToken";//This is not required for the webhook to be created - add your userApiToken for a checksum comparison
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "webhook": {
    "event": webhookEvent,
    "url": webhookUrl,
    "version": "2",// Must be version 2
    "contentType": "application/json",
    "token": apiToken
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/webhooks.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
