const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = Schema({
  name: String,
  surname: String,
  password: ,
  address: String,
  email: String
});


module.exports = mongoose.model("User", userSchema)
