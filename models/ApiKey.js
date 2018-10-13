/***********************************
****** IMPORTING DEPENDENCIES ******
***********************************/
const mongoose = require('mongoose');
const validate = require('mongoose-validator')

const Schema = mongoose.Schema;

/************************
** CREATING VALIDATORS **
*************************/
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
var apiKeySchema = Schema({
  contactname: {
    type: String,
    required: true,
    minlength: [3, 'Contact name should be at least 3 characters long.'],
    maxlength: [28, 'Contact name should me at most 28 characters long.']
  },
  company: {
    type: String,
    required: true,
    minlength: [3, 'Company name should be at least 3 characters long.'],
    maxlength: [30, 'Company name should be at most 30 characters long.']
  },
  email:  {
    type: String,
    required: true,
    validate: emailValidator
  },
  apikey: {
    type: String,
    required: true,
    minlength: [32, 'API key should be at least 32 characters long.'],
    maxlength: [32, 'API key should be at most 32 characters long.']
  },
});

module.exports = mongoose.model("ApiKey", apiKeySchema)
