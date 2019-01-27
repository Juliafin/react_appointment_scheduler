const express = require('express');
const path = require('path');

const htmlRouter = express.Router();
const buildFolder = path.resolve(process.cwd() + '/frontend/build');

htmlRouter.get('/test', (req, res) => res.json({message: "Welcome to the appointment scheduler!"}));

htmlRouter.get('*', (req, res) => res.sendFile(buildFolder + '/index.html'));

module.exports = htmlRouter;


