// This code sample will alter the access permission for the folder selected for a project
// Endpoint Url: https://${siteName}.teamwork.com/?action=invoke.googleDocsUI.OnSetGoogleDocsAccess()
// Endpoint params required:?mode=selectFolder&projectId=${projectId}&searchFor=&page=1&pageSize=1000&folder=${rootFolderId}&folderid=${rootFolderId}&refresh=true
// Endpoint Doc: Not public facing
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere";
const accessLevel = "allAdminsAndOwnerCompany" // ownerCompanyAdmins, alladmins, allAdminsAndOwnerCompany, allPeopleOnProject
const twAuthCookie = "tw-auth=tw-er8w9eriuwerbhwfgw988we6r24875gnjjuy-57389826" // This request requires a current tw-auth token as a cookie which can be captured from the Application tab on your browser developer tool or use the following code sample: https://github.com/Teamwork/Teamwork.com-API-Request-Examples/blob/main/getRequests/users/Get%20tw-auth%20cookie%20via%20headers.js

myHeaders.append("content-type", "application/x-www-form-urlencoded; charset=UTF-8")
myHeaders.append("Cookie", `${twAuthCookie}`);

const raw = `projectId=${projectId}&googleDocsAccess=${accessLevel}`;

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};
fetch(`https://${siteName}.teamwork.com/?action=invoke.googleDocsUI.OnSetGoogleDocsAccess()`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
