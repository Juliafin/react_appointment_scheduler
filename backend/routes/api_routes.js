const express = require('express');
const {User, Appointment} = require('../models/');
const lookupUserIP = require('../services/ip_lookup');
const bodyParser = require('body-parser');
const moment = require('moment');
const expressJWT = require('express-jwt');
const {SECRET} = require('./../../config');

const apiRouter = express.Router();

apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({extended: true}));
apiRouter.use(expressJWT({secret:SECRET}));

// Get user appointments provided a userID
apiRouter.get('/appointments', async(req, res) => {
  console.log('REQ USER in appointments!', req.user);
  let {_id} = req.user.user;
  if (!_id) {
    return res.status(400).json({message: "User id has not been provided"});
  }
  try {
    
    let user = await User
      .findById(_id)
      .populate('appointments');
    // console.log('USER', user)
    if (!user) {
      return res.status(404).json({message: "The user has not been found"});
    } else {
      if (!user.appointments.length) {
        return res.status(404).json({message: "User has no appointments", appointments: user.appointments, _id});
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
  console.log(appointment, 'appointment in request body in add appointment')
  let _id = req.user.user;
  if (!appointment.appointmentName || !appointment.appointmentPhoneNumber || !_id) {
    return res.status(400).json({message: "Appointment name or phone number is not valid or userID not provided."});
  } else {
    try {

      //Check if appointment exists in the system

      let appointmentFoundCount = await Appointment.find({time: appointment.time, user: _id}).count();
      console.log('Cound of appointment found', appointmentFoundCount);

      if (appointmentFoundCount) {
        return res.status(400).json({message: "Appointment already exists"});

      }

      appointment = new Appointment(appointment);
      appointment.user = _id;
      console.log('USER ID', _id);
      let savedAppointment = await appointment.save();
      let user = await User
        .findById(_id);
      
      console.log('found user', user);
      user.appointments.push(savedAppointment._id);
      let savedUser = await user.save();
      return res.json({message: "Appointment saved", appointmentID: savedAppointment._id});
    } catch(err) {
      console.log('There was an error adding the appointment');
      return res.status(500).json({message: "There was an error saving the appointment"});
    }

  }
});

// Update an appointment
apiRouter.put('/updateAppointment', async(req, res) => {
  let appointment = req.body;
  let {_id} = appointment;
  if (!_id) {
    return res.status(400).json({message: "Id must be provided in order to update an appointment"})
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





apiRouter.get('/ip', lookupUserIP);


module.exports = apiRouter;

