// TODO Fax must accept special symbols.
// TODO Phone must be separated when importing the CSV.
/***********************************
****** IMPORTING DEPENDENCIES ******
***********************************/
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const Schema = mongoose.Schema;
/************************
** CREATING VALIDATORS **
*************************/
// WEBSITE VALIDATOR
var websiteValidator = [
  validate({
    passIfEmpty: true,
    validator: 'isURL',
    message: 'Must be a valid website.'
  })
];
// EMAIL VALIDATOR
var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Must be a valid email address.'
  }),
  validate({
    validator: 'isLength',
    arguments: [10, 50],
    message: 'Email address should be between {ARGS[0]} and {ARGS[1]} characters.'
  })
];
/*************************
** DEFINING THE SCHEMA ***
**************************/
var hotelSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: emailValidator
  },
  website: {
    type: String,
    validate: websiteValidator
  },
  fax : {
    type: String,
    validate: [
      validate({
        passIfEmpty: true,
        validator: 'isAlphanumeric',
        message: 'Invalid fax.'
      })
    ]
  },
  state: String,
  rooms: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isNumeric',
        min: [0, 'The number of rooms must be a valid number.'],
      })
    ]
  },
  type: {
    type: String,
    required: true,
    minlength: [3, 'Hotel type must be at least 3 characters long.']
  },
  address: {
    type: String,
    required: true,
    minlength: [6, 'Address should be at least 6 characters long.'],
    maxlength: [20, 'Address should be at most 20 characters long.']
  },
  phone : {
    type: [String],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    latitud: {
      type: Number,
      required: true
    },
    longitud: {
      type: Number,
      required: true
    }
  }
});


module.exports = mongoose.model("Hotel", hotelSchema)
