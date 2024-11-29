// This code sample will make a request to to your sepcified V1 or V1 endpoints and return pagination andn rate limit information
// Comment out the header section for the API endpoint you are not requesting
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";

let page = 1

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

async function fetcHeaders() {
    let v1TasksUrl = "https://" + siteName + ".teamwork.com/tasks.json?page=" + page + "&pageSize=250";
    let v3TasksUrl = "https://" + siteName + ".teamwork.com/projects/api/v3/tasks.json?page=" + page + "&pageSize=500";
    const response = await fetch(v3TasksUrl, requestOptions)
    let data = await response.json()
    console.log(data)
    console.log(response.headers)
    console.log("\nHeaders - V1 Page info")
    console.log("Total records for request: " + response.headers.get('x-records'))
    console.log("Total pages: " + response.headers.get('x-pages'))
    console.log("Current page: " + response.headers.get('x-page'))
    /* console.log("\nHeaders - V3 Page info")
    console.log(`Total records up to current page: ${data.meta.page.count}`) // This is built based on the following (pageSize*page+1 if hasMore = true) or (pageSize*page and or (part thereof on last page) if hasMore = false)
    console.log(`Page offset: ${data.meta.page.pageOffset} - Page(${data.meta.page.pageOffset+1})`) // Page offset starts at 0 for page 1, pageoffset 1 for page 2, etc
    console.log(`Page Size: ${data.meta.page.pageSize}`)
    console.log(`Has More: ${data.meta.page.hasMore}`) */
    console.log("\nHeaders - Rate limit info")
    console.log(`x-ratelimit-limit:: ${response.headers.get('x-ratelimit-limit')}`)
    console.log(`x-ratelimit-remaining:: ${response.headers.get('x-ratelimit-remaining')}`)
    console.log(`x-ratelimit-reset:: ${response.headers.get('x-ratelimit-reset')}`)
}

fetcHeaders();
