const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const userId = "userIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "person": {
    //Essentials Tab
    "email-address": "sample@example.com",
    "first-name": "First Name",
    "last-name": "Last Name",
    "company-id": 110969,
    "user-type": "account",
    "isClientUser": false,
    "workingHours": {
        "entries": [
            {
                "weekday": "sunday",
                "taskHours": 0
            },
            {
                "weekday": "monday",
                "taskHours": 8
            },
            {
                "weekday": "tuesday",
                "taskHours": 8
            },
            {
                "weekday": "wednesday",
                "taskHours": 8
            },
            {
                "weekday": "thursday",
                "taskHours": 8
            },
            {
                "weekday": "friday",
                "taskHours": 8
            },
            {
                "weekday": "saturday",
                "taskHours": 0
            }
        ]
    },
    "sendInvite": false,
    //Details tab
    "title": "Support Lead",
    "phone-number-office": "",
    "phone-number-office-ext": "",
    "phone-number-mobile-countrycode": "IE",
    "phone-number-mobile-prefix": "21",
    "phone-number-mobile": "0122362806",
    "phone-number-home": "+1 844 819 3456",
    "phone-number-fax": "0314963229",
    "email-alt-1": "",
    "email-alt-2": "",
    "email-alt-3": "",
    //Address tab
    "address": {
        "line1": "Address Line 1",
        "line2": "Address Line 2",
        "city": "City",
        "state": "State",
        "zipcode": "Zipcode",
        "countrycode": "US"
    },
    //Profile tab
    "profile": "",
    //Notes tab
    "privateNotes": "",
    //Social tab
    "userTwitterName": "",
    "userLinkedin": "",
    "userFacebook": "",
    "userWebsite": "",
    "im-service": "Twitter",
    "im-handle": "",
    //Localization Tab
    "language": "EN",
    "dateFormatId": 2, // 1 = dd/mm/yyyy, 2 = mm/dd/yyyy, etc based on order in dropdown when setting date format
    "timeFormatId": 2, // 1 = 24hr, 2 = 12hr clock
    "timezoneId": 144, // Use https://apidocs.teamwork.com/docs/teamwork/v1/timezones/get-timezones-json to get a full list of timezone id's
    "calendarStartsOnSunday": "yes",// no will start the calendar on a Monday
    "lengthOfDay": 15,
    "changeForEveryone": false,
    //Permissions Tab
    "administrator": true,
    "canAddProjects": true,
    "canManagePeople": true,
    "autoGiveProjectAccess": true,
    "canAccessCalendar": true,
    "canAccessTemplates": true,
    "canAccessPortfolio": true,
    "canManageCustomFields": true,
    "canAddCustomReports": true, 
    "canManagePortfolio": true,
    "canManageProjectTemplates": true,
    "canViewProjectTemplates": true,
    "canViewSchedule": true, 
    "canManageSchedule": true, 
    "canManageTimeReminders": true,
    //Preferences tab
    "notifyOnTaskComplete": true,
    "notify-on-added-as-follower": true,
    "notify-on-status-update": true,
    "userReceiveNotifyWarnings": true,
    "userReceiveMyNotificationsOnly": true,
    //Preferences tab > Daily report email
    "receiveDailyReports": true,
    "receiveDailyReportsAtWeekend": true,
    "receiveDailyReportsIfEmpty": true,
    "soundAlertsEnabled": true,
    "dailyReportSort": "DATE",
    "receiveDailyReportsAtTime": "7",// PM times follow 24 hour clock ie: 21 = 9pm
    "dailyReportEventsType": "ALL",// MINE if you want to flag events for user only
    "dailyReportDaysFilter": 2,// Change this to alter how many days to filter tasks
    "avatarPendingFileRef": "",
    "removeAvatar": false,
    "allowEmailNotifications": true,
    //Preferences tab > Editing
    "textFormat": "TEXT",
    "useShorthandDurations": true
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/people/"+userId+".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
