const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {emailValid, passwordValid} = require('./validations');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: emailValid
  },
  password: {
    type: String,
    required: true
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  }]
});


userSchema.methods.showUser = function () {
  return {
    email: this.email,
    appointments: this.appointments,
    _id: this._id
  }; 
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", userSchema);

module.exports = User;