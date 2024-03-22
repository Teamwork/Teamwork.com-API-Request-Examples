const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

/*Event type id's:
-2 : Paid Time off
-3 : Sick Leave
-4 : Meeting
-5 : Other
-6 : Training
-7 : Public Holiday*/

const raw = JSON.stringify({
  "event": {
    "title": "Unavailable",
    "attending-user-ids": userId,
    "description": "Via API for ticket (unavailability - all day)",
    "start": "2024-04-15T09:00",//yyyy-mm-ddThh:mm
    "end": "2024-04-15T17:00",//yyyy-mm-ddThh:mm (Set date higher than start date to set unavailable time across multiple days)
    "ranges": [
      {
        "start": "2024-06-27T09:00",
        "end": "2024-06-27T17:00",
        "attending-user-ids": userId,
        "unavailableTimes": [
          {
            "userId": userId,
            "durationMinutes": 480,
            //"date": "2024-04-15"//yyyy-mm-dd (Remove this property if you are setting unavailable time across multiple days)
          }
        ]
      }
    ],
    "type": {
      "color": "ff0000",
      "unavailable": true,
      "id": -2,
      "name": "Paid Time Off"
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

fetch("https://"+siteName+".teamwork.com/calendarevents.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
