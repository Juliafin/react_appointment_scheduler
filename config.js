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
    PORT: process.env.PORT
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
    throw new Error('Environment is not valid');
    

}
console.log({...config, ...environment.common});
module.exports = {...config, ...environment.common};