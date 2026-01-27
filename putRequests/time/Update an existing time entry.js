// This code sample will update an existing time entry
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/time-tracking/put-time-entries-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const timeEntryId = "timeEntryIdHere";
const userId = userIdHere; // Int
const date = "dateHere";
const time = "timeHere";
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "time-entry": {
    "description": "This was edited via API",
    "date": date,
    "person-id": userId,
    "time": time,
    "hours": "4",
    "minutes": "30",
    "isbillable": true,
    "tags": "API"
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/time_entries/${taskId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
