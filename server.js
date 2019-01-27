const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const {PORT, MONGO_URL} = require('./config');
const htmlRouter = require('./backend/routes/html_routes');
const apiRouter = require('./backend/routes/api_routes');
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

app.use('/api', apiRouter);
app.use(htmlRouter);


const connectMongoose = (mongo_url=MONGO_URL) => {
  return mongoose.connect(mongo_url, {useNewUrlParser: true});
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
  mongoose.disconnect();
};

const initServer = async() => {
  let mongooseConnection;
  try {
    await startServer();
    mongooseConnection = await connectMongoose(MONGO_URL);

  } catch(err) {
    console.log('Something went wrong: ', err);
    mongooseConnection.disconnect();
  }
};


if (require.main === module) {
  initServer();
}


module.exports = {app, startServer, closeServer, connectMongoose};