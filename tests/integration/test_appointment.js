process.env.NODE_ENV = 'test';
const {expect} = require('chai');
const mongoose = require('mongoose');
const generateAppointments = require('../seed/seedAppointment');
const makeUsers = require('../seed/seedUser');
const {MONGO_URL} = require('../../config');
const {connectMongoose} = require('../../server');
const {Appointment, User} = require('../../backend/models/');
mongoose.Promise = global.Promise;
console.log()
describe('Testing Appointment model', (done) => {
  before(() => connectMongoose(MONGO_URL));
  after(() => {mongoose.disconnect();});
  // afterEach(() => {
  //   Appointment.deleteMany()
  //     .then(done, done);
  // });


  it ('Creates Appointments successfully', async() => {
    let user = makeUsers(1, true)[0];
    user = new User(user);
    let userId = user._id;
    let appointments = generateAppointments(10, userId);

    let savedUser = await user.save();
    console.log('AFTER USER SAVE');
    console.log('SAVED USER', savedUser);
    // appointments.forEach(async(appt) => {
    //   await Appointment.create(appt);
    // });
    console.log('APPOINTMENT', appointments[0]);
    let savedAppointment = await Appointment.create(appointments[0]);
    console.log('saved appointment', savedAppointment);

    let appointmentsInDb = await Appointment.find();
    console.log(appointmentsInDb, 'APOINTMENTS IN DB');
  });

});