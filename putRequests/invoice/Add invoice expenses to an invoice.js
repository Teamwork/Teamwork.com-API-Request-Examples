// This code sample will add selected invoice expenses to an invoice on a project
// Items required: 
// - invoiceId
// - invoice expenses ids, this can be anything from a single expense to multiple (comma separated) ie: "36762,36763",
// Endpoint documentation: https://apidocs.teamwork.com/docs/teamwork/v1/invoices/put-invoices-id-lineitems-json
const myHeaders = new Headers();
const userName = "email address or API KEY here";
const password = "password";
const siteName = "yourSiteName"
const invoiceId = "invoiceIdHere"
const expenseIds = "expenseIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic "+btoa(userName+":"+password));

const raw = JSON.stringify({
  "lineitems": {
    "add": {
      "expenses": expenseIds
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
