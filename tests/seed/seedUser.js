const faker = require('faker');
const mongoose = require('mongoose');

const generatePassword = (len=6) => {
  let specialCharSet = "?!/[]{}()#$@%";
  let alaphabet = [...Array(26)].map((e,i)=>(i+10).toString(36)).join("");
  let capitals = alaphabet.toUpperCase();
  let lowerCase = alaphabet.toLowerCase();
  let numbers = "0123456789";
  let fullCharSet = specialCharSet + capitals + lowerCase + numbers;
  let fullCharArr = [[specialCharSet], [numbers], [capitals], [lowerCase]];

  let password = '';
  let randomCharPositions = [];
  while(randomCharPositions.length < 4) {
    let r = Math.floor(Math.random() * len);
    if(randomCharPositions.indexOf(r) === -1) randomCharPositions.push(r);
  }
  randomCharPositions.sort();

  for (let i = 0; i < len; i++) {
    if (randomCharPositions[0] === i) {
      let charArr = fullCharArr[0][0];
      let randomCharPosition = Math.floor(Math.random() * charArr.length);
      let specialChar = charArr[randomCharPosition];
      password += specialChar;

      fullCharArr.shift();
      randomCharPositions.shift();
    } else {
      password += fullCharSet[Math.floor(Math.random()  * fullCharSet.length)];
    }
  }
  return password;
};
generatePassword();

// console.log(User);
const makeUsers = (quantity=1, valid=true) => {
  let userId = mongoose.Types.ObjectId();
  let users = [];
  for (let i = 0; i < quantity; i ++) {
    let password, passwordLen, email;
    if (valid) {
      passwordLen = faker.random.number({min: 6, max: 20});
      password = generatePassword(passwordLen);
      email = faker.internet.email();
    } else {
      let wrongLen = [faker.random.number({max: 5}), faker.random.number({min: 20, max: 50})];
      passwordLen = wrongLen[Math.floor(Math.random() * 2)];
      password = faker.internet.password(passwordLen, false);
      email = faker.internet.userName();
    }
    users.push({email, password, _id: userId});
  }
  return users;
};

// console.log(makeUsers(5, true));

module.exports = makeUsers;


