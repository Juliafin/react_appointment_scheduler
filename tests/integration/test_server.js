process.env.NODE_ENV = 'test';
const chai = require('chai');
const mongoose = require('mongoose');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const {app, startServer, closeServer} = require('../../server');
const {MONGO_URL} = require('../../config');

chai.use(chaiHttp);

describe('Testing main server endpoints', () => {
  afterEach(closeServer);
  after(() => mongoose.disconnect());

  it('Server Starts successfully', () => {
    startServer();
  });


  it('/', async() => {
    let response = await chai.request(app).get('/');
    expect(response).to.be.a('object');
    expect(response).to.haveOwnProperty('text');
    expect(response.text).to.be.a('string');   
    expect(response.text).to.have.lengthOf.above(0);
    expect(response.text.indexOf('html')).to.not.equal(-1);
  });
  
  it('/test', async() => {
    let response = await chai.request(app).get('/test');
    expect(response).to.be.a('object');
    expect(response).to.haveOwnProperty('body');
    expect(response.body).to.be.a('object');   
    expect(response.body).to.haveOwnProperty('message');
    expect(response.body.message).to.be.a('string');
    expect(response.body.message).to.equal('Welcome to the appointment scheduler!');
  });

});
