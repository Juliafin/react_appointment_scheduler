process.env.NODE_ENV = 'test';
const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const {app, startServer, closeServer, connectMongoose} = require('../../server');
const makeUsers = require('../seed/seedUser');
const {MONGO_URL} = require('../../config');


chai.use(chaiHttp);

let user = makeUsers(1, true)[0];
let _token = '';
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
    expect(response.body).to.be.a('object');
    expect(response.status).to.equal(200);
    expect(response.body.message).to.be.a("string");
    expect(response.body.createdUser).to.be.a("object");
    expect(response.body.token).to.be.a('string');
    expect(response.body.message).to.equal("User Created");
    // expect(user._id.toString()).to.equal(response.body.createdUser._id.toString());
    expect(user.email).to.equal(response.body.createdUser.email);
  });

  it ('Registration endpoint should not allow a duplicate user to be created', async() => {
    
    try {

      await chai.request(app)
        .post('/auth/register')
        .send(user);
    } catch(error) {
      expect(error.status).to.equal(400);
      expect(error.message).to.be.a('string');
    }
  });

  it ('Login endpoint should allow an existing user to log in', async() => {

    let response = await chai.request(app)
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password
      });
    
    expect(response.body).to.be.a('object');
    expect(response.body.message).to.be.a('string');
    expect(response.body.message).to.equal('Successfully logged in');
    expect(response.body.userToken).to.be.a('string');
    expect(response.body.userToken).to.have.lengthOf.greaterThan(0);
    expect(response.body.loggedInUser).to.be.a('object');
    expect(response.body.loggedInUser.email).to.be.a('string');
    expect(response.body.loggedInUser.email).to.equal(user.email);
    
  });

  it('Login endpoint should throw an unauthorized error when given an incorrect password', async() => {
    try {
      await chai.request(app)
        .post('/auth/login')
        .send({
          email: user.email,
          password: 'Somethingrandom'
        })
    } catch(err) {
      expect(err.status).to.equal(401);
    }
  });

  it('Authentication endpoint should return a success with a valid token', async() => {

    let anotherUser = makeUsers(1, true)[0];

    let registerResponse = await chai.request(app)
      .post('/auth/register')
      .send({
        email: anotherUser.email,
        password: anotherUser.password
      });

    let {token} = registerResponse.body;
    token = `bearer ${token}`
    console.log('TOKEN!!!!! ', token);
    let response = await chai.request(app)
      .post('/auth/authenticate')
      .set('Authorization', token);
    expect(response.status).to.equal(200);
  });




});