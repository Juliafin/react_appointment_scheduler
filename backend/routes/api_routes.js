const express = require('express');
const {User, Appointment} = require('../models/');
const lookupUserIP = require('../services/ip_lookup');
const bodyParser = require('body-parser');

const apiRouter = express.Router();

apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({extended: true}));


// Get user appointments provided a userID
apiRouter.get('/appointments', async(req, res) => {
  console.log('REQ BODY', req.body);
  let {userID} = req.body;
  if (!userID) {
    return res.status(400).json({message: "User id has not been provided"});
  }
  try {
    
    let user = await User
      .findById(userID)
      .populate('appointments');
    console.log('USER', user)
    if (!user) {
      return res.status(404).json({message: "The user has not been found"});
    } else {
      if (!user.appointments.length) {
        return res.status(404).json({message: "User has no appointments", appointments: user.appointments, userID});
      } else {
        return res.json({message: "Appointments found", appointments: user.appointments, userID});

      }
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({message: "The provided id is invalid"});
    console.log(err);
  }

});



// Add an appointment for a user

apiRouter.post("/addAppointment", async(req, res) => {
  let {appointment, userID } = req.body;
  if (!appointment.appointmentName || !userID) {
    return res.status(400).json({message: "Appointment is not valid or userID not provided."});
  } else {
    try {

      appointment = new Appointment(appointment);
      appointment.user = userID;
      console.log('USER ID', userID);
      let savedAppointment = await appointment.save();
      let user = await User
        .findById(userID);
      
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


// Delete an appointment

apiRouter.delete('/deleteAppointment', (req, res) => {
  let {appointmentID} = req.body.appointmentID;
  if (!appointmentID) {
    res.status(400).json({message: "Appointment Id not provided."});
  } 
});





apiRouter.get('/ip', lookupUserIP);


module.exports = apiRouter;

