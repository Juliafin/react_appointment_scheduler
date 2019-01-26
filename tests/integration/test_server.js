const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, startServer, closeServer} = require('../../server');


describe('Testing main server endpoints', () => {
  after(closeServer);
  it('Server Starts successfully', () => {
    startServer();
  })
});