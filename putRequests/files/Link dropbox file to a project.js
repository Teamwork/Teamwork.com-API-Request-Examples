// This code sample will link a bropbox file to a project on your site
// Note that the following information is required from Dropbox which is a 3rd party application and at the time of writing the code sample this link helped get the data required https://dropbox.github.io/dropbox-api-v2-explorer/#files_get_metadata
// - id for dropbox file
// - path for dropbox file
// - size for dropbox file
// - name of dropbox file
// On teamwork.com you will require a project id, catefory id if appliciable but not mandatory and user ids for who can access the file

const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const projectId = projectIdHere; // int
const fileCategoryId = fileCategoryIdHere; // int - 0 if no category is to be applied
const dropboxFileId = "dropboxFileIdHere";
const dropboxFilePath = "dropboxFilePathHere";
const dropboxFileSize = "dropboxFileSizeHere"";
const dropboxFileName = "dropboxFileNameHere";
const userAccessIds = "userAccessIdsHere"; // comma separated list of user ids
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "projectId": projectId,
  "categoryId": fileCategoryId,
  "newCategoryName": "Documents",
  "files": [
    {
      "id": dropboxFileId,
      "path": dropboxFilePath,
      "size": dropboxFileSize,
      "type": "file",
      "name": dropboxFileName
    }
  ],
  "accessRights": "WRITER",
  "grantAccessTo": userAccessIds,
  "provider": "dropbox"
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/cloudstorage/files/link.json?provider=dropbox`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
