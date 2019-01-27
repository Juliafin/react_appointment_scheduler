const mongoose = require('mongoose');
const {emailValid, passwordValid} = require('./validations');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    match: emailValid
  },
  password: {
    type: String,
    // required: true,
    match: passwordValid
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  }]
});


const User = mongoose.model("User", userSchema);

module.exports = User;