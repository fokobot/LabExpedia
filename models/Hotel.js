const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var hotelSchema = Schema({
  name: String,
  email: String,
  website: String,
  state: String,
  type: String,
  size: String
});


module.exports = mongoose.model("Hotel", hotelSchema)
