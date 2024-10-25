// This code sample is an example of looping through the time entries data for the V2 time entries endpoint. 
// Filters set to display all timelogs including archived projects time
// A function to display response headers also included. Comment out if you do not require this information. 
// Endpoint Url: https://" + siteName + ".teamwork.com/time_entries.json
// Endpoint Url: https://" + siteName + ".teamwork.com/projects/api/v2/time.json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"

let loop = true
let page = 1

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

async function fetchTime() {
    do {
        let timeEntryUrl = "https://" + siteName + ".teamwork.com/projects/api/v2/time.json?page=" + page + "&pageSize=500&getTotals=true&projectId=&companyId=0&userId=&assignedTeamIds=&invoicedType=all&billableType=all&fromDate=&toDate=&sortBy=date&sortOrder=asc&onlyStarredProjects=false&includeArchivedProjects=true&matchAllTags=false&projectStatus=all"
        const response = await fetch(timeEntryUrl, requestOptions)
        let data = await response.json()
        console.log(data)
        if (page < response.headers.get('x-pages')) {
            page++
        } else {
            loop = false;
            printHeaders(response) // Comment out this function if you do not want to print the headers to the console
        }
    } while (loop);

}

fetchTime();

function printHeaders(response) {
    //console.log(response.headers) // Remove commenting at the start of this console log to get a full list of response headers for the endpoint
    console.log("\nHeaders - Page and rate limit info")
    console.log("Total records for request: " + response.headers.get('x-records'))
    console.log("Total pages: " + response.headers.get('x-pages'))
    console.log("Current page: " + response.headers.get('x-page'))
    console.log("x-ratelimit-limit: " + response.headers.get('x-ratelimit-limit'))
    console.log("x-ratelimit-remaining: " + response.headers.get('x-ratelimit-remaining'))

    console.log("\nGet all time headers only")
    console.log("x-total-mins-sum: " + response.headers.get('x-total-mins-sum'))
    console.log("x-non-billable-mins-sum: " + response.headers.get('x-non-billable-mins-sum'))
    console.log("x-non-billed-mins-sum: " + response.headers.get('x-non-billed-mins-sum'))
    console.log("x-billable-mins-sum: " + response.headers.get('x-billable-mins-sum'))
    console.log("x-billed-mins-sum: " + response.headers.get('x-billed-mins-sum'))
    console.log("x-task-estimated-mins-sum: " + response.headers.get('x-task-estimated-mins-sum'))
}
