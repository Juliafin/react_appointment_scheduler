const express = require('express');
const mongoose = require('mongoose');
const {User, Appointment} = require('../models/');
const bodyParser = require('body-parser');

const apiRouter = express.Router();



apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({extended: true}));

apiRouter.get('/appointments', async(req, res) => {
  let {userID} = req.body;
  if (!userID) {
    res.status(400).json({message: "User id has not been provided"});
  }
  console.log('REQ BODY', req.body);
  let id = mongoose.Types.ObjectId();
  try {
    
    let user = await User
      .findById(userID)
      .populate('appointments');
    if (!user) {
      return res.json({message: "The user has not been found"})
    } else {
      console.log(user, 'user');
      return res.json({userID, user});
    }
  } catch(err) {

    res.status(500).json({message: "The provided id is invalid"});
    console.log(err)
  }

});


module.exports = apiRouter;

