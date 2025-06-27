// This code sample will get all projects custom field data > Loop through each item in the customfieldProjects object > Printout the customfieldId, customFieldValueId and the value of the custom field if a value exists. 
// Params included:
// - includeCompletedProjects=true
// - includeCustomFields=true
// - optional parameter to filter by customfield Value `&projectCustomField[4875][eq]=Needs attention`
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v3/projects/get-projects-api-v3-projects-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const filterCustomField = "";//&projectCustomField[4875][eq]=Needs attention

let loop = true
let page = 1

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

async function fetchProjects() {
    do {
        let v3ProjectsUrl = `https://${siteName}.teamwork.com/projects/api/v3/projects.json?includeCompletedTasks=true&includeCustomFields=true&page=${page}${filterCustomField}`
        const response = await fetch(v3ProjectsUrl, requestOptions)

        let data = await response.json()
        //console.log(data)
        var customfieldProjects = data["included"]["customfieldProjects"];
        var hasMore = data["meta"]["page"]["hasMore"];
        for (const key in customfieldProjects) {
            if (customfieldProjects.hasOwnProperty(key)) {
                const field = customfieldProjects[key];
                if (field.value != null) {
                    console.log(`customfieldId: ${field.customfieldId}`);
                    console.log(`customFieldValueId: ${field.id}`);
                    console.log(`value: ${field.value} \n`);
                }
            }
        }
        page++
    } while (hasMore);
}

fetchProjects();
