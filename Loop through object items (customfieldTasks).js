// This code sample get all tasks which have the specified value for a specific custom field > Loop through each item in the customfieldTasks object > Printout the customfieldId, customFieldValueId, taskId and the value of the custom field. 
// Params included:
// - includeCompletedTasks=true
// - includeCustomFields=true
// - customField[customfieldId][any]=Approved,Needs attention (This sample data is linked to a dropdown custom field, any is an operator for filtering)
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v3/tasks/get-projects-api-v3-tasks-json
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

async function fetchTime() {
    do {
        let tasksUrl = "https://" + siteName + ".teamwork.com/projects/api/v3/tasks.json?includeCompletedTasks=true&includeCustomFields=true&customField[4532][any]=Approved,Needs attention&page=" + page
        const response = await fetch(tasksUrl, requestOptions)

        let data = await response.json()
      
        var customfieldTasks = data["included"]["customfieldTasks"];
        var hasMore = data["meta"]["page"]["hasMore"];
        for (const key in customfieldTasks) {
            if (customfieldTasks.hasOwnProperty(key)) {
                const field = customfieldTasks[key];
                if (field.value == "Needs attention") {
                    console.log(`customfieldId: ${field.customfieldId}`);
                    console.log(`customFieldValueId: ${field.id}`);
                    console.log(`taskId: ${field.taskId}`)
                    console.log(`value: ${field.value} \n`);
                }
            }
        }
        //console.log(page);
        page++
    } while (hasMore);

}

fetchTime();
