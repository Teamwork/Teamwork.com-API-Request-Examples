// This code samples shows how to add a company custom field value.
// Required fields: companyId for URL path,customfieldId and value for request body
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/post-projects-api-v3-companies-company-id-customfields-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const companyId = "companyIdHere"
const customFieldId = customfieldIdhere; // integer
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "customfieldCompany": {
    "countryCode": "",
    "currencySymbol": "",
    "customfieldId": customFieldId,
    "urlTextToDisplay": "",
    "value": "R123455"
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/companies/${companyId}/customfields.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
