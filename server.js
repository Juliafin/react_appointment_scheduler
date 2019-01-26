const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const {PORT, MONGO_URL} = require('./config');
const htmlRouter = require('./backend/routes/html_routes');
const app = express();
let server;

mongoose.Promise = global.Promise;

const buildFolder = path.join(__dirname, '/frontend/build/');

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('common'));
}

// Serve frontend statically

app.use(express.static(buildFolder));

// Routes

app.use(htmlRouter);


const connectMongoose = (mongo_url=MONGO_URL) => {
  return mongoose.connect(MONGO_URL, {useNewUrlParser: true});
};

const disconnectMongoose = () => {
  return mongoose.disconnect();
};



const startServer = () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
      .on('error', () => {
        closeServer();
        reject(new Error('Server unable to connect'));
      });
    
    resolve(server);
  });
};

const closeServer = () => {
  server.close();
};

const initServer = async() => {
  try {
    await startServer();
    await connectMongoose(MONGO_URL);
    console.log('Successfully connected to mongoose');

  } catch(err) {
    console.log('Something went wrong: ', err);
    await disconnectMongoose();
  }
};


if (require.main === module) {
  initServer();
}


module.exports = {app, startServer, closeServer, connectMongoose, disconnectMongoose};