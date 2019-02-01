const express = require('express');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jsonWebToken = require('jsonwebtoken');
const {User} = require('../models/index');
const {SECRET} = require('../../config');
const authRouter = express.Router();

authRouter.use(bodyParser.json());
authRouter.use(bodyParser.urlencoded({extended: true}));


authRouter.post('/register', async(req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({message: "Email and password must both be provided"});
  }

  // Check if user exists in the db
  try {

    let foundUser = await User.findOne({email}).count()
    console.log(foundUser);
  
    if (foundUser) {
      return res.status(400).json({message: "User already exists"});
    }
  
    let hashedPassword = await User.hashPassword(password);
  
    let createdUser = await User.create({
      email, password: hashedPassword
    });
    let userToken = jsonWebToken.sign({user:createdUser}, SECRET); 
    console.log('Created user');
    res.json({
      message: "User Created", 
      createdUser: createdUser.showUser(),
      token: userToken
    });
  } catch(error) {
    console.log('There was an error', error)
    return res.status(500).json({message: "Internal Server error"});
  }

});



authRouter.post('/login', async(req, res) => {
  console.log('inside login');
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({message: "Email and password must both be provided"});
  }

  try {

    let userFound = await User.findOne({email});
    console.log(userFound);
    if (!userFound) {
      return res.status(404).json({message: "User not found."});
    }
  
    let passwordValid = userFound.validatePassword(password);
    console.log('Password valid', passwordValid);
  
    if (passwordValid) {
      let userToken = jsonWebToken.sign({user:userFound}, SECRET);
      return res.json({message: "Successfully logged in", userToken, loggedInUser: userFound.showUser()});
    } else {
      return res.status(401).json({message: "Unauthorized"})
    }
  } catch(error) {
    console.log('There was an error', error)
    return res.status(500).json({message: "Internal Server error"});
  }

});


authRouter.post('/authenticate', expressJWT({secret: SECRET}), (req, res) => {

  console.log(req.user, 'INSIDE AUTHENTICATE', req.user);
  if(req.user.user._id) {
    return res.json({userID: req.user.user._id});
  } else {
    return res.status(400).json({message: "User could not be authenticated"});
  }
});


module.exports = authRouter;