var express = require('express');
var router = express.Router();

const userController = require("../controllers/UserController");

router.route('/')
  .get(userController.all)
  .post(userController.new)

router.route('/:id')
      .put(userController.update)

module.exports = router;
