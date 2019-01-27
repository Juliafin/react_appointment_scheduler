process.env.NODE_ENV = 'test';
const {expect} = require('chai');
const mongoose = require('mongoose');
const makeUsers = require('../seed/seedUser');
const {MONGO_URL} = require('../../config');
const {connectMongoose} = require('../../server');
console.log('MONGO URL', MONGO_URL);
const {User} = require('../../backend/models/');
mongoose.Promise = global.Promise;
// let mongooseConnection;
console.log(MONGO_URL, 'mongo URL IN TEST USER');

describe('Testing user model', (done) => {
  before(() => connectMongoose(MONGO_URL));
  after(() => {mongoose.disconnect();});
  // afterEach(() => {
  //   User.deleteMany()
  //     .then(done, done);
  // });
  
  it('Writes to the database successfully', async() => {
    let user = makeUsers(1, true)[0];
    await User.create(user);
    let foundUser = await User.findOne(user);
    expect(foundUser.password).to.be.a('string');
    expect(foundUser.email).to.be.a('string');
    expect(user._id.toString()).to.equal(foundUser._id.toString());
    expect(foundUser.password).to.be.equal(user.password);
    expect(foundUser.email).to.be.equal(user.email);
  });

  // it('Throws a validation error when given incorrect User Data', async() => {


  // });
});
