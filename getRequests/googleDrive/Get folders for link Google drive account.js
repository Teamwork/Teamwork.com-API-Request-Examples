
// This code sample will return a payload of all folders for a Google drive account linked to a site. 
// The accessible folders will be based on the root folder selected at site level
// Endpoint Url: https://${siteName}.teamwork.com/integrations/googledrive/folder.json
// Endpoint params required:?mode=selectFolder&projectId=${projectId}&searchFor=&page=1&pageSize=1000&folder=${rootFolderId}&folderid=${rootFolderId}&refresh=true
// Endpoint Doc: Not public facing
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const projectId = "projectIdHere";
const rootFolderId = "0" // Leave as 0 if you want the root folder at site level. If you know a root folder you want to start from, add the id here

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/integrations/googledrive/folder.json?mode=selectFolder&projectId=${projectId}&searchFor=&page=1&pageSize=1000&folder=${rootFolderId}&folderid=${rootFolderId}&refresh=true`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
