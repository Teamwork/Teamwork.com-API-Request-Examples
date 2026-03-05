// This code sample will create a new client with all fields available in the UI client creation modal
// The client domains are applied with the following endpoint: https://apidocs.teamwork.com/docs/teamwork/v3/companies/post-projects-api-v3-companies-id-domains-json
// Please take note that applying a currency can enable the multicurrecny feature which can not be reverted - https://support.teamwork.com/projects/finance/multi-currency
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "company": {
    "name": "New client by API", // Required field
    "website": "https://www.teamwork.com/?noredirect",
    "emailOne": "api@teamwork.com",
    "phone": "1234567890",
    "addressOne": "Teamwork Campus One",
    "addressTwo": "Blackpool Retail Park",
    "city": "Blackpool",
    "state": "Cork",
    "zip": "T23 F902",
    "privateNotes": "Private notes related to the client can be added here.\n",
    "profile": "Public notes related to the client can be added here.\n",
    "logoPendingFileRef": "tf_6444e389-a673-47a9-a165-959bd5926f64.png" // Note that the logo must be uploaded first to get a referecne id - https://apidocs.teamwork.com/guides/teamwork/file-uploading-via-the-api-preferred
    //"currencyId": 3 // adding a different currency from your base currency set on your account can enable multi currency - this can not be changed afterwards so please read through https://support.teamwork.com/projects/finance/multi-currency before adding a value here
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/companies.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
