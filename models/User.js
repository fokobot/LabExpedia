const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Longitud mínima: 3.']
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email:  {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("User", userSchema)
