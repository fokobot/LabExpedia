// TODO: Validar email como único
// TODO: En el controlador, encriptar la contraseña.
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
var userSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name should be at least 3 characters long.'],
    index: true
  },
  lastname: {
    type: String,
    required: true,
    minlength: [3, 'Last name should be at least 3 characters long.']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password should be at least 8 characters long.'],
    maxlength: [20, 'Password should be at most 20 characters long.']
  },
  email:  {
    type: String,
    required: true,
    validate: emailValidator
  },
  address: {
    type: String,
    required: true,
    minlength: [6, 'Address should be at least 6 characters long.'],
    maxlength: [20, 'Address should be at most 20 characters long.'],
    index: true
  },
});

module.exports = mongoose.model("User", userSchema)
