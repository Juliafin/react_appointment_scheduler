process.env.NODE_ENV = 'test';
const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {app, startServer, closeServer, connectMongoose} = require('../../server');
const makeUsers = require('../seed/seedUser');
const {MONGO_URL} = require('../../config');


chai.use(chaiHttp);

let user = makeUsers(1, true)[0];

describe('Authentication endpoints', () => {
  before(() => {
    return connectMongoose(MONGO_URL)
      .then(() => {
        return startServer();
      });
  });

  after(() => {
    closeServer();
  });

  it('Registration Endpoint should register a new user', async() => {
    let response = await chai.request(app)
      .post('/auth/register')
      .send(user);
    console.log('RESPONSE FROM REGISTER', response);
    expect(response.body).to.be.a('object');
    expect(response.status).to.equal(200);
    expect(response.body.message).to.be.a("string");
    expect(response.body.createdUser).to.be.a("object");
    expect(response.body.token).to.be.a('string');
    expect(response.body.message).to.equal("User Created");
    expect(user._id.toString()).to.equal(response.body.createdUser._id.toString());
  });




});