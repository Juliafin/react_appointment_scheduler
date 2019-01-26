const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const {PORT} = require('./config');
let server;
const buildFolder = path.join(__dirname, '/frontend/build/');
const htmlRouter = require('./backend/routes/html_routes');

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('common'));
}

// Serve frontend statically

app.use(express.static(buildFolder))

// Routes

app.use(htmlRouter);


const startServer = () => {
  server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

const closeServer = () => {
  server.close();
};


if (require.main === module) {
  startServer();
}


module.exports = {app, startServer, closeServer};