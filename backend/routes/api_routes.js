const express = require('express');
const {User, Appointment} = require('../models/');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const {SECRET} = require('./../../config');
const mongoose = require('mongoose');
const apiRouter = express.Router();

apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({extended: true}));
apiRouter.use(expressJWT({secret:SECRET}));

// Get user appointments provided a userID
apiRouter.post('/appointments', async(req, res) => {
  let {_id} = req.user.user;
  if (!_id) {
    return res.status(400).json({message: "User id has not been provided"});
  }
  try {
    
    let user = await User
      .findById(_id)
      .populate('appointments');
    if (!user) {
      return res.status(404).json({message: "The user has not been found"});
    } else {
      if (!user.appointments.length) {
        return res.status(200).json({message: "User has no appointments", appointments: user.appointments, _id});
      } else {
        return res.json({message: "Appointments found", appointments: user.appointments, _id});

      }
    }
  } catch(err) {
    // console.log(err)
    res.status(500).json({message: "The provided id is invalid"});
    console.log(err);
  }

});



// Add an appointment for a user

apiRouter.post("/addAppointment", async(req, res) => {
  let appointment = req.body;
  console.log('REQ.USER in add Appointment!!!!', req.user);
  console.log(appointment, 'appointment in request body in add appointment');
  let {_id} = req.user.user;
  if (!appointment.appointmentName || !appointment.appointmentPhoneNumber || !_id) {
    return res.status(400).json({message: "Appointment name or phone number is not valid or userID not provided."});
  } else {
    try {

      //Check if appointment exists in the system

      let appointmentFoundCount = await Appointment.find({time: appointment.time, user: _id}).countDocuments();
      console.log('Cound of appointment found', appointmentFoundCount);

      if (appointmentFoundCount) {
        return res.status(400).json({message: "Appointment already exists"});

      }
      
      let appointmentID = new mongoose.Types.ObjectId();


      appointment = new Appointment(appointment);
      appointment._id = appointmentID;
      appointment.user = _id;
      console.log('USER ID', _id);
      await appointment.save();

      let user = await User
        .findById(_id);
      

      console.log('found user', user);
      user.appointments.push(appointmentID);
      await user.save();
      return res.json({message: "Appointment saved", appointmentID: appointmentID, userID: _id});
    } catch(err) {
      console.log('There was an error adding the appointment');
      console.log(err);
      return res.status(500).json({message: "There was an error saving the appointment"});
    }

  }
});

// Update an appointment
apiRouter.put('/updateAppointment', async(req, res) => {
  let appointment = req.body;
  console.log('APPOINTMENT IN UPDATE APPOINTMENT!', appointment);
  let {_id} = appointment;
  if (!_id) {
    return res.status(400).json({message: "Id must be provided in order to update an appointment"});
  }

  let updatedAppointment = await Appointment.findByIdAndUpdate(_id, appointment, {new: true});
  console.log('Here is the updated appointment');

  res.json({message: "Appointment successfully updated", updatedAppointment});

});



// Delete an appointment

apiRouter.delete('/deleteAppointment', (req, res) => {
  let {appointmentID} = req.body.appointmentID;
  if (!appointmentID) {
    res.status(400).json({message: "Appointment Id not provided."});
  } 
});

module.exports = apiRouter;
