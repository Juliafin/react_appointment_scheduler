const express = require('express');
const morgan = require('morgan');
const app = express();
const {PORT} = require('./config');
let server;

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('common'));
}

app.get('/', (req, res) => res.send("hello"));
app.get('/test', (req, res) => res.json({message: "Welcome to the appointment scheduler!"}));


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