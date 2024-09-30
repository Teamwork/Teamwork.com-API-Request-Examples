// This code sample is an example of looping through the latest activity data. This is the information you will see on the home > activity page on your site.
// Filters set to capture all activity
// Endpoint Url: https://" + siteName + "/projects/api/v3/latestactivity.json //ie: example.teamwork.com
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"

let loop = true
let page = 1
let cursor = ""

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
method: "GET",
headers: myHeaders,
redirect: "follow"
};
//&startDate=2024-06-01&endDate=2024-06-30
// adding &endDate=2024-06-30 starts the search from that date
async function fetchPosts() {
do {
let latestActivityUrl = "https://" + siteName + "/projects/api/v3/latestactivity.json?skipCounts=true&activityTypes=&range=allTime&hideObservedProjects=false&include=users,projects,companies,tasks,reactions,notebooks,links&onlyProjectsWithExplicitMembership=false&onlyStarredProjects=false&projectIds=&userIds=&endDate=2024-06-07&pageSize=50&limit=50&page=" + page
const response = await fetch(latestActivityUrl, requestOptions)
let data = await response.json()
console.log(data)
if (page == 1) {
loop = true;
} else {
loop = data.meta.page.hasMore;
}
page++;
} while (loop);
}

fetchPosts();
