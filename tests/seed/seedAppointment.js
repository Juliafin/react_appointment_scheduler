const faker = require('faker');
const mongoose = require('mongoose');

const generateAppointments = (len, userID) => {
  let appointments = [];
  userID = userID || mongoose.Types.ObjectId();
  for (let i = 0; i < len; i++) {
    let appointment = {
      date: faker.date.recent().toISOString(),
      appointmentName: faker.company.bsAdjective() + ' ' + faker.company.bsNoun(),
      appointmentPhoneNumber: faker.phone.phoneNumber("###-###-####"),
      user: userID 
    };
    appointments.push(appointment);

  }
  // console.log(appointments);
  return appointments;
};


// console.log(generateAppointments(3));

module.exports = generateAppointments;