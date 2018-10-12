require("./config/db");

const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// ********* *Importing routers *********
const hotels = require('./routes/hotels');
const users = require('./routes/hotels');

// ********** HOTEL ROUTES ********
app.use('/hotels', hotels);
// ********** USER ROUTES *********
app.use('/users', users);


app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(3000, function () {
  console.log('API Server started successfully!');
});
