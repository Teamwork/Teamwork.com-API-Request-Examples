# This code sample will create a time entry on the specified project and can be extended to add to a specific task if applicaiable with the task id
# Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v3/time-tracking/post-projects-api-v3-projects-project-id-time-json
import requests
import json

sitename = "yourSiteName"
userName = "email address or API KEY here"
password = "" # If you are using an APIKey as the user name, the password can be anything ie: "xxx"
date = '2025-11-19' # yyyy-mm-dd ie: '2025-11-19' would be the 19th October 2025
time = '09:00:00' # hh:mm:ss
userid = 238860 # Int
projectId = 778149 # Int
taskId = None; # Leave as None if applying time to project only - If you want to link time to a task add the taskId here - int value ie: 3645454

payload = json.dumps({
  "timelog": {
    "date": date,
    "time": time,
    "isUtc": True,
    "description": "Description here",
    "isBillable": False,
    "minutes": 60, # Must be in minutes
    "projectId": projectId,
    "taskId": taskId,
    "userId": userid,
    "tagIds": []
  },
  "tags": [],
  "timelogOptions": {
    "markTaskComplete": True
  }
})
print(payload) # To confirm payload is correct - comment out if not requeired
url = f'https://{sitename}.teamwork.com/projects/api/v3/projects/{projectId}/time.json'

response = requests.post(url, auth=(userName, password), data=payload)

print(response.text)
