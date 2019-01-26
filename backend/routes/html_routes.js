const express = require('express');
const htmlRouter = express.Router();

htmlRouter.get('/test', (req, res) => res.json({message: "Welcome to the appointment scheduler!"}));
htmlRouter.get('*', (req, res) => res.sendFile(buildFolder + 'index.html'));

module.exports = htmlRouter;


