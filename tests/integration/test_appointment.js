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
  afterEach(() => {
    Appointment.deleteMany()
      .then(done, done);
  });


  it ('Creates Appointments successfully', async() => {
    let user = makeUsers(1, true)[0];
    user = new User(user);
    let userId = user._id;
    let appointments = generateAppointments(10, userId);
    await user.save();
    await Appointment.create(appointments);

    let appointmentCount = await Appointment.count();
    console.log(appointmentCount, 'APOINTMENTS IN DB');
    expect(appointmentCount).to.equal(appointments.length);
  });

});