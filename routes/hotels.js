var express = require('express');
var router = express.Router();

const hotelController = require("../controllers/HotelController");

router.route("/")
  .get(hotelController.listAllHotels)
  .post(hotelController.createNewHotel);

router.route('/search')
    .get(hotelController.search)

router.route('/searchByRange/')
  .get(hotelController.searchByRange)

module.exports = router;
