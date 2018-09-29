require("./config/db");

const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controllers/TaskController");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app
  .route("/tasks")
  .get(taskController.listAllTasks)
  .post(taskController.createNewTask);

app
  .route("/tasks/:taskid")
  .get(taskController.readTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

app.route('/prueba/:uwu').get(function (req, res, next) {
  res.send('Hola' + req.params.uwu);
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
