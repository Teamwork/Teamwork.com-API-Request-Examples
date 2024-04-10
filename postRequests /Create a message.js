const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
const categoryId = "categoryIdHere";//integer - 0 for no category
const mentionHandle = "@firstNameLastNameInitial";
const projectId = "projectIdHere";
const userId = "userIdHere";//Comma separate multiple user id's if required
const tagId = "tagIdHere";//Comma separate multiple tag id's if required
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const raw = JSON.stringify({
  "post": {
    "category-id": categoryId,
    "title": "Welcome to our project John",
    "body": "Hey " + mentionHandle + " , I would like to welcome you to my instance of Teamwork.com where we can communicate outside our video calls and emails. \n\nI understand that this may look daunting as a product but I will guide you as we go on. A lot of companies use project management software and you may come across one in a future role! Even if it not Teamwork.com they are using, you will have a grasp of what can be achieved with such a platform.\n\n[Notebooks](https://support.teamwork.com/projects/search?query=notebooks): For starters I have created a Notebook which will have some brief information about Google Data studio. Notebooks are handy for note taking and research notation. As a rule of thumb if you feel the information you want to store would not be a message then it will belong in a notebook. Feel free to add your own [notebook here](https://marccashman.teamwork.com/#/projects/611198/notebooks). \n\n[Messages](https://support.teamwork.com/projects/search?query=message): You can have multiple messages on a project, similar to this one. Any user on a project has the ability to reply to the message and or any other message they have access to via privacy. I have left the privacy open on this but can let you know about privacy on projects if you would like to know how and why it is required. Feel free to reply to this message (green button under message similar to screenshot) so that you will have an idea of a message thread.\n\n[Links](https://support.teamwork.com/projects/search?query=links): I have included a few links to get use started but feel free to add your own for reference. You will be surprised when you would need them again and forget the URL. I used to use this a lot when I was in support and more so when I was training new support staff and hosting webinars.\n\n[Files](https://support.teamwork.com/projects/search?query=files): The files page for a project is where you will find and have the ability to add files at project level. Any file that you attached to a comment, message, task, etc will appear on the files page. I have uploaded a sample data file which we will use in Google Data Studio. Feel free to upload your own files if required.\n\nI think that is enough for a while. please feel free to reach out to me any time if you have any questions.",
    "content-type": "TEXT",
    "notify": userId,
    "notify-current-user": true,//set to false if you do not want to be notified as the message creator
    "tagIds": tagId,
    "grant-access-to": "",
    "private": 0,
    "pendingFileAttachments": [],
    "updateFiles": true,
    "attachments": "",
    "removeOtherFiles": true,
    "attachmentsCategoryIds": "",
    "pendingFileAttachmentsCategoryIds": ""
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/projects/"+projectId+"/messages.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
