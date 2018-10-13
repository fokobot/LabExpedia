/**************************************
****** IMPORTING API KEY SCHEMA *******
**************************************/
const crypto  = require('crypto');
const ApiKey  = require("../models/ApiKey");

/*********************************
****** Creation of api keys ******
**********************************/
exports.create = (req, res) => {
  // Creates 256-byte long key
  const hat= require('hat');
  var rack = hat.rack();
  var key = rack(req.body.contactname + req.body.company + req.body.email);
  // after creating the api key, stores it
  let newApiKey = new ApiKey({contactname: req.body.contactname,
          company: req.body.company,
          email: req.body.email,
          apikey: key});
  newApiKey.save((err, key) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json({apikey: key.apikey});
  });
};
