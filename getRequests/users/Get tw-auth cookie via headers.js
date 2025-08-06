// This code sample will give you access to a current tw-auth cookie
// Endpoint Url: https://${siteName}.teamwork.com/me.json?includeAuth=true
// Endpoint Doc: https://apidocs.teamwork.com/docs/teamwork/v1/people/get-me-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName";
myHeaders.append("Authorization", "Basic " + btoa(userName + ":" + password));

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/me.json?includeAuth=true`, requestOptions)
  .then(response => {
    console.log('Response Headers:');
    for (const [key, value] of response.headers.entries()) {
        //console.log(`${key}: ${value}`);
        if(key == 'set-cookie' && value.includes('tw-auth')){
        console.log(`${key}: ${value}`);
        }
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
