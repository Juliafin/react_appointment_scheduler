import React from 'react';
import './appointment.css';


const Appointment = ({appointmentName, appointmentTime, appointmentIndex, appointmentPhoneNumber, edited, onClick}) => {
  let editedClass = `${edited ? 'editedAppointment waves-effect waves-red' : 'newAppointment waves-effect waves-red'} appointmentBody `;
  return (
    <div 
      className="appointmentContainer"
      index={appointmentIndex}
      onClick={onClick}>
      <div index={appointmentIndex} className="appointment">
        <div index={appointmentIndex} className={editedClass + 'name'}>{appointmentName ? appointmentName : '+'}</div>
        <div index={appointmentIndex} className={editedClass + 'phoneNumber'}>{appointmentPhoneNumber ? appointmentPhoneNumber : 'Phone number'}</div>
        <div index={appointmentIndex} className={editedClass + 'time'}>{appointmentTime}</div>
      </div>
    </div>
  );
};

export default Appointment;