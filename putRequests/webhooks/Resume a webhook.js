const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const webhookId = "webhookIdHere";
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/webhooks/"+webhookId+"/resume.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
