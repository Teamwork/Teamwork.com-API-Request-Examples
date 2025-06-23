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
        "attending-user-ids": "238860",
        "description": "Training for 4 hours",
        "start": "2025-06-24T09:00",
        "end": "2025-06-24T13:00",
        "ranges": [
            {
                "start": "2025-06-24T09:00",
                "end": "2025-06-24T13:00",
                "attending-user-ids": "238860",
                "unavailableTimes": [
                    {
                        "userId": 238860,
                        "durationMinutes": 240,
                        "date": "2025-06-24T09:00"
                    }
                ]
            }
        ],
        "type": {
            "color": "00ffff",
            "unavailable": "1",
            "id": "-6",
            "name": "Training",
            "translatedName": "Training"
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
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://" + siteName + ".teamwork.com/calendarevents.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
