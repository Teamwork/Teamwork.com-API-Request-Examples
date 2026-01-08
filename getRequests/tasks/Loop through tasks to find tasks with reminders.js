// This code sample is an example of looping through the tasks payload and displaying the task id for tasks identified as having a task reminder.
// Filters set to capture active tasks only.
// Endpoint Url: `https://${siteName}/projects/api/v3/tasks.json
const myHeaders = new Headers();
onst userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";

let page = 1

myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

async function fetchTasks() {
  console.log("Script started")
  do {
      let v3TasksUrl = `https://${siteName}.teamwork.com/projects/api/v3/tasks.json?pageSize=500&checkForReminders=true&page=${page}`
      const response = await fetch(v3TasksUrl, requestOptions)

      let data = await response.json()
      var tasks = data["tasks"];
      //console.log(tasks) // For debugging if required
      var hasMore = data["meta"]["page"]["hasMore"];
      for (const task in tasks){
        //console.log(tasks[task].hasReminders );// For debugging if required
        if (tasks[task].hasReminders == true){
        console.log(tasks[task].id);   
        }
      }
      page++
  } while (hasMore);
  console.log("Script finished")
}

fetchTasks();
