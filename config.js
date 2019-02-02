require('dotenv').config();

const environment = {

  production : {
    MONGO_URL: process.env.MONGO_URL_PROD || 'mongodb://localhost:27017/react_appointment_scheduler'
  },
  
  local : {
    MONGO_URL: process.env.MONGO_URL_LOCAL || 'mongodb://localhost:27017/react_appointment_scheduler'
  },
  
  test : {
    MONGO_URL: process.env.MONGO_URL_TEST || 'mongodb://localhost:27017/react_appointment_scheduler'
  },
  common: {
    PORT: process.env.PORT,
    SECRET: process.env.SECRET
  }
  
};
let config;
switch(process.env.NODE_ENV) {
case "local":
  config = environment['local'];
  break;
case "production":
  config = environment['production'];
  break;
case "test":
  config = environment['test'];
  break;
default:
  config = environment['local'];
}
// console.log({...config, ...environment.common});
module.exports = {...config, ...environment.common};