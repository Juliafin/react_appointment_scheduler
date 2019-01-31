import moment from 'moment';


const generateTimes = (initialHour, endHour) =>  {
  const hours = [];
  for(let hour = initialHour, i = 0; hour < endHour + 1; hour++, i++) {
    hours.push({
      appointmentTime: moment({ hour }).format('h:mm A'),
      appointmentName: "",
      appointmentIndex: i,
      appointmentPhoneNumber: "",
      edited: false
    });
  }
  // console.log(hours);
  return hours;
};
export default generateTimes;