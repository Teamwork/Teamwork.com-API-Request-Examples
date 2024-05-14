const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const notebookCategoryId = "notebookCategoryIdHere";//integer - 0 for no category
const projectId = "projectIdHere";
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "notebook": {
    "name": "New notebook",
    "description": "",
    "content": "New notebook, blah, blah",
    "category-id": notebookCategoryId,
    "locked": false,
    "notebook-type": "MARKDOWN",
    "notify": "ALL",
    "notify-current-user": false,
    "secureContent": false,
    "grant-access-to": "",
    "private": 0
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/projects/"+projectId+"/notebooks.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
