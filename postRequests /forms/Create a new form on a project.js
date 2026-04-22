// This code sample create a new form on a project.
// This is an example that matches the form layouyt for our Proof of concept Google apps script to capture form data and populate to a sheet
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const hostProjectId = hostProjectIdHere; // Int
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "form": {
    "hostObject": {
      "id": hostProjectId,
      "type": "projects"
    },
    "content": {
      "banner": {
        "primaryColor": "red"
      },
      "definition": [
        {
          "label": "Full Name",
          "help": "",
          "name": "text",
          "type": "text",
          "validation": "max:100,length|required",
          "tw_id": "1",
          "tw_type": "text"
        },
        {
          "label": "Email",
          "help": "",
          "name": "email",
          "type": "email",
          "validation": "email|required",
          "tw_id": "2",
          "tw_type": "email"
        },
        {
          "label": "RAG Status",
          "help": "Task Status - (select one)",
          "name": "select",
          "type": "select",
          "tw_id": "3",
          "validation": "required",
          "options": [
            {
              "value": "red",
              "label": "Red"
            },
            {
              "value": "amber",
              "label": "Amber"
            },
            {
              "value": "green",
              "label": "Green"
            }
          ],
          "tw_type": "select"
        },
        {
          "label": "Code Languages",
          "help": "Select multiple if applicable",
          "name": "checklist",
          "type": "checkbox",
          "tw_id": "4",
          "validation": "required",
          "options": [
            {
              "value": "java-script",
              "label": "JavaScript"
            },
            {
              "value": "cold-fusion",
              "label": "Cold Fusion"
            },
            {
              "value": "go-lang",
              "label": "GoLang"
            },
            {
              "value": "python",
              "label": "Python"
            }
          ],
          "tw_type": "checkbox_list"
        },
        {
          "label": "Course Start Date",
          "help": "",
          "name": "date",
          "type": "date",
          "validation": "required",
          "tw_id": "5",
          "tw_type": "date"
        },
        {
          "label": "Year of qualification",
          "help": "",
          "name": "",
          "type": "radio",
          "tw_id": "6",
          "validation": "required",
          "options": [
            {
              "value": "2020",
              "label": "2020"
            },
            {
              "value": "2021",
              "label": "2021"
            },
            {
              "value": "2022",
              "label": "2022"
            },
            {
              "value": "2023",
              "label": "2023"
            }
          ],
          "tw_type": "radio_group"
        },
        {
          "label": "Comment on your favourite course",
          "help": "",
          "name": "textarea",
          "type": "textarea",
          "tw_id": "7",
          "validation": "max:4000,length|required",
          "tw_type": "textarea"
        },
        {
          "label": "Favourite Module",
          "help": "",
          "name": "text",
          "type": "text",
          "tw_id": "8",
          "validation": "max:100,length|required",
          "tw_type": "text"
        },
        {
          "label": "Attached your certificate",
          "help": "",
          "name": "attachment",
          "type": "file",
          "tw_id": "9",
          "validation": "required",
          "max_num_of_files": 5,
          "max_file_size": 10,
          "allowed_file_types": [],
          "tw_type": "attachment"
        }
      ],
      "name": "Form created by API",
      "state": "draft"
    }
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/projects/api/v3/forms.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
