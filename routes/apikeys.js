var express = require('express');
var router = express.Router();

const apiKeyController = require("../controllers/ApiKeyController");

router.route("/")
  .post(apiKeyController.create);

module.exports = router;
