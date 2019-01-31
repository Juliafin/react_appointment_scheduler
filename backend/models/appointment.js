const mongoose = require('mongoose');
const {appointmentMaxLength, phoneNumberValid} = require('./validations');

const appointmentSchema = new mongoose.Schema({
  time: {
    type: String,
  },
  appointmentName: {
    type: String,
    required: true,
    trim: true,
    maxlength: appointmentMaxLength
  },
  appointmentPhoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: phoneNumberValid
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;