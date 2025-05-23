// This code sample is an example of 1: Capturing the total seats for an account 2: Count users by usertype including client users.
// Once the script is actioned it will print out the license seats total as well as the count of each user type
// Endpoint Url: https://${siteName}.teamwork.com/account.json?getPreferences=true - https://apidocs.teamwork.com/docs/teamwork/v1/account/get-account-json
// Endpoint Url: https://${siteName}.teamwork.com/projects/api/v3/people.json?searchTerm=&companyId=&sort=firstName&sortOrder=asc&getCounts=true&includeClockIn=true&returnTeams=true&skipCounts=false&includeJobRoles=true&includeSkills=true&pageSize=100&page=${page} - https://apidocs.teamwork.com/docs/teamwork/v3/people/get-projects-api-v3-people-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"

let userTypeCounts = {};
let clientUserCount = 0;
let page = 1

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

async function fetchSeats() {

    let accountUrl = `https://${siteName}.teamwork.com/account.json?getPreferences=true`
    const response = await fetch(accountUrl, requestOptions)

    let data = await response.json()

    let seats = data["account"]["paidForUsers"];
    console.log(`Total paid seats: ${seats}`);

}

async function fetchUserTypes() {
    do {
        let userUrl = `https://${siteName}.teamwork.com/projects/api/v3/people.json?searchTerm=&companyId=&sort=firstName&sortOrder=asc&getCounts=true&includeClockIn=true&returnTeams=true&skipCounts=false&includeJobRoles=true&includeSkills=true&pageSize=100&page=${page}`
        const userResponse = await fetch(userUrl, requestOptions)

        let userData = await userResponse.json()

        var people = userData["people"];
        var hasMore = userData["meta"]["page"]["hasMore"];

        for (const person of people) {
            const userType = person.type || "unknown";
            if (person.type === "account") {
                if (person.isClientUser === true) {
                    clientUserCount++;
                } else {
                    userTypeCounts[userType] = (userTypeCounts[userType] || 0) + 1;
                }
            } else {
                userTypeCounts[userType] = (userTypeCounts[userType] || 0) + 1;
            }
        }

        //console.log(`Page ${page} finished`);
        page++
    } while (hasMore);
    console.log("User Type Counts:", userTypeCounts);
    console.log("Total Client Users:", clientUserCount);
}

fetchSeats();
fetchUserTypes();
