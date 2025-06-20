// This code sample is an example of looping through the V3 people endpoint. 
// Filters set to narrow down user(s) by email address
// A function to display the object based the search term matching a users email address. 
// Endpoint Url: https://${siteName}.teamwork.com/projects/api/v3/people.json?searchTerm=${searchTerm}&fields[people]=id,firstName,lastName,email`
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const searchTerm = "searchTerm"// The search term is used for comparing results for an exact match, so no encoding can be used

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

async function getUserByEmail() {
    do {
        let searchUrl = `https://${siteName}.teamwork.com/projects/api/v3/people.json?searchTerm=${searchTerm}&fields[people]=id,firstName,lastName,email`
        const response = await fetch(searchUrl, requestOptions)
        let data = await response.json()
        //console.log(data);
        
        const people = data["people"];
        var hasMore = data["meta"]["page"]["hasMore"];

        for (const key in people) {
            if (people[key].email == searchTerm) {
                console.log("Bingo")
                console.log(data["people"][key])
            }
        }

    } while (hasMore);
}

getUserByEmail();
