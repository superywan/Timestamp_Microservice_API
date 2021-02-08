// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let responseObject = {};

app.get("/api/timestamp/:date_string", (req, res) => {
  let { date_string } = req.params;
  if (/\d{5,}/.test(date_string)) {
    const date = parseInt(date_string);
    responseObject.unix = date;
    responseObject.utc = new Date(date).toUTCString();
  } else {
    const date = new Date(date_string);
    if (date.toString() === "Invalid Date") 
      res.json({ error : "Invalid Date" });
    responseObject.unix = new Date(date).valueOf();
    responseObject.utc = new Date(date).toUTCString();
  }
  res.json(responseObject);
});

app.get("/api/timestamp", (req, res) => {
  responseObject.unix = new Date().getTime();
  responseObject.utc = new Date().toUTCString();
  res.json(responseObject);
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port 3000');
});

