const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdHere"
const userIds = "userIdsHere" // Multiple user id's can be added here to set unavailabel time for each user in bulk ie: "12345,67575"
const userId2 = "userId2Here" // If you are creating the same unavailable time for multiple users, use this id for the 2nd user and create more variables if you have more than two users
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
        "attending-user-ids": userIds,
        "description": "Training in 2hr blocks for 5 days - 10hr total",
        "start": "2024-07-08T09:00",
        "end": "2024-07-12T17:00",
        "ranges": [
            {
                "start": "2024-07-08T09:00",
                "end": "2024-07-12T17:00",
                "attending-user-ids": userIds,
                "unavailableTimes": [
                    {
                        "userId": userId,
                        "durationMinutes": 600
                    },
                    {
                        "userId": userId2,
                        "durationMinutes": 600
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
