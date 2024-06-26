//https://apidocs.teamwork.com/docs/teamwork/v1/calendar-event/put-calendarevents-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdHere" 
const eventId = "eventIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

/*Event type id's:
-2 : Paid Time Off
-3 : Sick Leave
-4 : Meeting
-5 : Other
-6 : Training
-7 : Public Holiday*/

const raw = JSON.stringify({
  "event": {
    "attending-user-ids": userId,
    "description": "Meeting all day",
    "start": "2024-06-17T09:00",//yyyy-mm-ddThh:mm
    "end": "2024-06-17T13:00",//yyyy-mm-ddThh:mm
    "ranges": [
      {
        "start": "2024-06-17T09:00",//yyyy-mm-ddThh:mm
        "end": "2024-06-17T13:00",//yyyy-mm-ddThh:mm
        "attending-user-ids": userId,
        "unavailableTimes": [
          {
            "userId": userId,
            "durationMinutes": 360,
            "date": "2024-06-17T09:00"//yyyy-mm-ddThh:mm
          }
        ]
      }
    ],
    "type": {
      "id": -2,
      "name": "Paid Time Off",
      "color": "0000ff",
      "unavailable": true,
      "translatedName": "Paid Time Off"
    },
    "all-day": false,
    "utc": true,
    "attendees-can-edit": true,
    "privacy": {
      "type": "all"
    }
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://" + siteName + ".teamwork.com/calendarevents/" + eventId + ".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
