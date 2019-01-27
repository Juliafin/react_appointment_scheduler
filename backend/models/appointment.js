const mongoose = require('mongoose');
const {appointmentMaxLength} = require('./validations');

const appointmentSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now()
  },
  appointmentName: {
    type: String,
    required: true,
    trim: true,
    maxlength: appointmentMaxLength
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "User"
  }
});


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;