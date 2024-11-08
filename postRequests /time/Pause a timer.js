// This code sample will pause a timer based on the timerId you pass in.
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v3/time-tracking/put-projects-api-v3-me-timers-timer-id-pause-json 
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const timerId = "timerIdsHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://" + siteName + ".teamwork.com/projects/api/v3/me/timers/" + timerId + "/pause.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
