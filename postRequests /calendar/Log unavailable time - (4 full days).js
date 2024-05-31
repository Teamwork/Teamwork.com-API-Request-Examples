const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdHere"
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
        "title": "Unavailable",
        "attending-user-ids": userId,
        "description": "11 - 14 June",
        "start": "2024-06-11T09:00",//yyyy-mm-ddThh:mm
        "end": "2024-06-14T17:00",//yyyy-mm-ddThh:mm
        "ranges": [
            {
                "start": "2024-06-11T09:00",//yyyy-mm-ddThh:mm
                "end": "2024-06-14T17:00",//yyyy-mm-ddThh:mm
                "attending-user-ids": userId,
                "unavailableTimes": [
                    {
                        "userId": userId,
                        "durationMinutes": 480
                    }
                ]
            }
        ],
        "type": {
            "color": "0000ff",
            "unavailable": "1",
            "id": "-2",
            "name": "Paid Time Off",
            "translatedName": "Paid time off"
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
