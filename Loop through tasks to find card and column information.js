// This code sample is an example of looping through task data for the V3 tasks endpoint. 
// Filters set to display all tasks including completed and from archived projects
// A function to display response headers also included. Comment out if you do not require this information. 
// Endpoint Url: https://" + siteName + ".teamwork.com/projects/api/v3/tasks.json
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v3/tasks/get-projects-api-v3-projects-project-id-tasks-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"

let loop = true
let page = 1
let totalTasks = 0
let countCards = 0

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

async function fetchTasks() {
    do {
        let v3TasksUrl = "https://" + siteName + ".teamwork.com/projects/api/v3/tasks.json?pageSize=500&includeCompletedTasks=true&showCompletedLists=true&includeArchivedProjects=true&fields[cards]=id,column&fields[columns]=id,name,project&include=cards,cards.columns&page=" + page
        const response = await fetch(v3TasksUrl, requestOptions)

        let data = await response.json()
        //console.log(data.tasks);
        
        var tasks = data["tasks"];
        var cards = data["included"]["cards"];
        var columns = data["included"]["columns"];
        var hasMore = data["meta"]["page"]["hasMore"];

        //console.log(data.included);
       
        for (const key in tasks) {
            if (tasks[key].card != null) {
                var taskId = tasks[key].id
                var cardId = tasks[key].card.id
                var columnId = cards[`${cardId}`].column.id
                var columnName = columns[`${columnId}`].name
                console.log(`Task Id; ${taskId}`)
                console.log(`Card Id; ${cardId}`)
                console.log(`Column Id; ${columnId}`);
                console.log(`Column Name; ${columnName}\n`);
                countCards++
        }
        totalTasks++
    }
        console.log(`Page ${page} finished`);
        page++
    } while (hasMore);
    console.log(`Total task on a project board: ${countCards}`);
    console.log(`Total requested tasks: ${totalTasks}`);
}

fetchTasks();
