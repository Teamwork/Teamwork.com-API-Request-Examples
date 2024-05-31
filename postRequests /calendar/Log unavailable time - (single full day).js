const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "event": {
    "title": "Unavailable",
    "attending-user-ids": userId,
    "description": "Meeting all day",
    "start": "2024-05-31T09:00",//yyyy-mm-ddThh:mm
    "end": "2024-05-31T17:00",//yyyy-mm-ddThh:mm
    "ranges": [
      {
        "start": "2024-05-31T09:00",//yyyy-mm-ddThh:mm
        "end": "2024-05-31T17:00",//yyyy-mm-ddThh:mm
        "attending-user-ids": userId,
        "unavailableTimes": [
          {
            "userId": userId,
            "durationMinutes": 480,
            "date": "2024-05-31T09:00"//yyyy-mm-ddThh:mm
          }
        ]
      }
    ],
    "type": {
      "color": "0000ff",
      "unavailable": "1",
      "id": "-4",
      "name": "Meeting",
      "translatedName": "Meeting"
    },
    "all-day": true,
    "utc": true,
    "attendees-can-edit": true,
    "privacy": {
      "type": "all"
    }
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
