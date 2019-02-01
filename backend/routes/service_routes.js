const express = require('express');
const lookupUserIP = require('../services/ip_lookup');

const serviceRouter = express.Router();

serviceRouter.get('/ip', lookupUserIP);

module.exports = serviceRouter;