// This code sample is an example for creating a new client / company on Teamwork.com. 
// Endpoint Documentation: https://apidocs.teamwork.com/docs/teamwork/v3/companies/post-projects-api-v3-companies-json
// Associated guide: If you require a logo to be added for your new customer / client then please review https://apidocs.teamwork.com/guides/teamwork/file-uploading-via-the-api-preferred to get a file reference number
// Endpoint Url: https://${siteName}.teamwork.com/projects/api/v3/companies.json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "company": {
    "name": "Teamwork.com123465",
    "website": "https://www.teamwork.com/",
    "emailOne": "support1@teamwork.com",
    "phone": "+1 303 300 5318",
    "addressOne": "Teamwork Campus Onev",
    "addressTwo": "Blackpool Retail Park",
    "city": "Blackpool",
    "state": "Cork",
    "zip": "T23 F902",
    "privateNotes": "Private notes go here\n",
    "profile": "Public facing notes (in Teamwork.com) go here\n"
    //"logoPendingFileRef": ""// This process involves a getting reference number for a new file (tf_481bfbf0-094d-4d29-8dc7-1e765c8bcb8e.png) captured while following the upload a file via API process 
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
