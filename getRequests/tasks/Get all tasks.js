// This code sample is an example of looping through the tasks data with the V3 get all tasks endpoint. 
// Filters set to display all tasks (active and completed) including tasks from archived projects and completed taskslists
// A function to display response headers also included. Comment out if you do not require this information. 
// Endpoint Url: https://${siteName}.teamwork.com/projects/api/v3/tasks.json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"

let hasMore = true
let page = 1

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

async function fetchTime() {
    do {
        let v3TasksUrl = `https://${siteName}.teamwork.com/projects/api/v3/tasks.json?showCompletedLists=true&includeCompletedTasks=true&includeArchivedProjects=true&page=${page}&pageSize=500`
        const response = await fetch(v3TasksUrl, requestOptions)
        let data = await response.json()
        console.log(data)
        hasMore = data.meta.page.hasMore;
        printHeaders(response, page, hasMore) // Comment out this function if you do not want to print the headers to the console
        page++
    } while (hasMore);
}

fetchTime();

function printHeaders(response, page, hasMore) {

    console.log(response.headers) // Remove commenting at the start of this console log to get a full list of response headers for the endpoint
    console.log("\nHeaders - Page and rate limit info")
    console.log("Current page: " + page)
    console.log("Has More pages: " + hasMore)
    console.log("x-ratelimit-limit: " + response.headers.get('x-ratelimit-limit'))
    console.log("x-ratelimit-remaining: " + response.headers.get('x-ratelimit-remaining'))
}
