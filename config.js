require('dotenv').config();

const environment = {

  production : {
    MONGO_URL: process.env.MONGO_URL_PROD
  },
  
  local : {
    MONGO_URL: process.env.MONGO_URL_LOCAL
  },
  
  test : {
    MONGO_URL: process.env.MONGO_URL_TEST
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