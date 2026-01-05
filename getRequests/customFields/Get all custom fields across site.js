// This code sample is an example of capturing all custom field entities on a Teamwork.com site. 
// Filters set to return all custom fields across a site including 
// - project,task (project specific included), company custom fields
// - Deleted custom fields
// - but excludes formula fields by default
// Alter the filters to make the request more bespoke according to the allowed values
// Endpoint Url: https://${siteName}.teamwork.com/projects/api/v3/customfields.json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const entityLookup = ""//Allowed values: company,project,task - leave blank if you want to search all custom fields entities
const useeFormulaFields = ""//Allowed values: true,false - false by default so can be left blank
const showDeleted = ""//Allowed values: true,false - false by default so can be left blank
const onlySiteLevelFields = ""//Allowed values: true,false - false by default so can be left blank if you want to include custom fields that are project specific

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/customfields.json?pageSize=500&entities=${entityLookup}&useFormulaFields=${useeFormulaFields}&showDeleted=${showDeleted}&onlySiteLevel=${onlySiteLevelFields}`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
