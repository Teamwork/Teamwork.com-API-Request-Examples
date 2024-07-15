const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"

let page = 1

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

async function fetcHeaders() {
    let latestActivityUrl = "https://" + siteName + ".teamwork.com/projects/api/v2/time.json?page=" + page + "&pageSize=50&getTotals=true&projectId=&companyId=0&userId=&assignedTeamIds=&invoicedType=all&billableType=all&fromDate=&toDate=&sortBy=date&sortOrder=asc&onlyStarredProjects=false&includeArchivedProjects=false&matchAllTags=true&projectStatus=all"
    const response = await fetch(latestActivityUrl, requestOptions)
    //console.log(response.headers)
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

fetcHeaders();
