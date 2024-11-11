// This code sample will add selected timelogs to an invoice on a porject
// Items required: 
// - invoiceId
// - timelog ids, this can be anything from a single timelog to multiple (comma separated) ie: "22529745,22534146",
// Notes: The "timelogTotals" object is not required but should be added for good practice if you know the proper values. Bear in mind that if you add a value here that is different from the timelog duration and hourly rate for user, the value you add will be applied which could be different. If you are unsure, omit the "timelogTotals" object.
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/invoices/put-invoices-id-lineitems-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const invoiceId = "invoiceIdHere"
const timelogIds = "timelogIdsHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "lineitems": {
    "add": {
      "timelogs": timelogIds
    },
    "timelogTotals": {
      "22529745": 200,
      "22534146": 75
    }
  }
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/invoices/"+invoiceId+"/lineitems.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
