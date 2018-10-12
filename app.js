require("./config/db");

const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controllers/TaskController");
const hotelController = require("./controllers/HotelController");
const userController = require('./controllers/UserController');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app
  .route("/hotels")
  .get(hotelController.listAllHotels)
  .post(hotelController.createNewHotel);

app.route('/hotels/search')
    .get(hotelController.search)

app
  .route('/users')
  .get(userController.all)
  .post(userController.new)

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(3000, function () {
  console.log('API Server started successfully!');
});
