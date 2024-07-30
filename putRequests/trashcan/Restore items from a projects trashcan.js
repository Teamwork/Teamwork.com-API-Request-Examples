// https://apidocs.teamwork.com/docs/teamwork/v1/trashcan/put-trashcan-resource-id-restore-json
// This script will restore items from a projects trashcan if they were deleted within 30 days - this scenario will restore a deleted timelog if it exists
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const resource = "resourceHere"; // Resources that can be restored "projects, tasks, milestones, tasklists, messages, messagereplies, notebooks, files, fileversions, timelogs, links, comments, people"
const resourceId = "resourceIdHere";
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/trashcan/"+resource+"/"+resourceId+"/restore.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
