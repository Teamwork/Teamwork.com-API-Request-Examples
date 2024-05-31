const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "event": {
    "id": 0,
    "title": "Unavailable",
    "attending-user-ids": userId,
    "type": {
      "color": "0000ff",
      "unavailable": true,
      "id": -4,
      "name": "Meeting"
    },
    "description": "Via API for ticket (unavailability)",
    "start": "2024-06-18T09:00",//yyyy-mm-ddThh:mm
    "end": "2024-06-18T17:00",//yyyy-mm-ddThh:mm
    "all-day": true,
    "attendees-can-edit": true
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://" + siteName + ".teamwork.com/calendarevents.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
