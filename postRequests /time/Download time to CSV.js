const myHeaders = new Headers();
const installId = "installIdHere";
const userId = "userIdHere";
const tw_key = "tw_keyHere";
const reportType = "reportTypeHere"//Other formats: excel, pdf,
const startDate = "startDateHere"
const endDate = "endDateHere"
const projectId = "projectIdHere"
const urlencoded = new URLSearchParams();
urlencoded.append("action", "Time_DownloadReport");
urlencoded.append("reportType", "csv");
urlencoded.append("startDate", startDate);
urlencoded.append("endDate", endDate);
urlencoded.append("projectId", projectId);
urlencoded.append("userId", "");
urlencoded.append("teamIds", "");
urlencoded.append("invoicedType", "all");
urlencoded.append("billableType", "all");
urlencoded.append("sortBy", "date");
urlencoded.append("sortOrder", "asc");
urlencoded.append("tagIds", "");
urlencoded.append("companyId", "0");
urlencoded.append("taskTagIds", "");
urlencoded.append("matchAllTags", "true");
urlencoded.append("projectsFromCompanyId", "0");
urlencoded.append("projectStatus", "");
urlencoded.append("onlyStarredProjects", "false");
urlencoded.append("includeArchivedProjects", "false");
urlencoded.append("selectedColumns", "date,project,whoLoggedTime,descriptionAndTags,attachedTaskList,startTime,endTime,isEntryBillable,hasEntryBeenBilled,timeTaken,hoursTaken,estimatedTime");
urlencoded.append("includeTags", "true");

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
};

fetch("https://tw-export.teamwork.com/?tw_i="+installId+"&tw_u="+userId+"&tw_key="+tw_key, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
