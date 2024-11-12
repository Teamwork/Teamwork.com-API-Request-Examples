// This code samples shows how to update the value of a company custom field.
// Required fields: companyId and customFieldId for URL path, customfieldId and value for request body
// Note that the Id for the value of the custom field has a capatalized F for field. - customFieldId
// Endpoint: https://apidocs.teamwork.com/docs/teamwork/v3/custom-fields/patch-projects-api-v3-companies-company-id-customfields-custom-field-id-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const companyId = "companyIdHere"
const customfieldId = customfieldIdhere; // integer - Company custom field id
const customFieldId = customFieldIdhere; // Unique Id for the value of the custom field
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "customfieldCompany": {
    "countryCode": "",
    "currencySymbol": "",
    "customfieldId": customfieldId,
    "urlTextToDisplay": "",
    "value": "R1234557"
  }
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/companies/${companyId}/customfields/${customFieldId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
