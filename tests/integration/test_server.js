const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const {app, startServer, closeServer} = require('../../server');

chai.use(chaiHttp);

describe('Testing main server endpoints', () => {
  afterEach(closeServer);
  it('Server Starts successfully', () => {
    startServer();
  });

  it('/', async() => {
    let response = await chai.request(app).get('/');
    console.log(response.text);
    // response.text.should.be.a('string');
    expect(response).to.be.a('object');
    expect(response).to.haveOwnProperty('text');
    expect(response.text).to.be.a('string');   
    expect(response.text).to.have.lengthOf.above(0);
    expect(response.text.indexOf('html')).to.not.equal(-1);
  });
  
  it('/test', async() => {
    let response = await chai.request(app).get('/test');
    console.log(response.body);
    expect(response).to.be.a('object');
    expect(response).to.haveOwnProperty('body');
    expect(response.body).to.be.a('object');   
    expect(response.body).to.haveOwnProperty('message');
    expect(response.body.message).to.be.a('string');
    expect(response.body.message).to.equal('Welcome to the appointment scheduler!');
  });

});