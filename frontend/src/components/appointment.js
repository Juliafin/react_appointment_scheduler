import React from 'react';
import './appointment.css';


const Appointment = ({appointmentName, appointmentTime, appointmentIndex, onClick}) => {
  return (
    <div 
      className="appointmentContainer"
      index={appointmentIndex}
      onClick={onClick}>
      <div index={appointmentIndex} className="appointment">
        <div index={appointmentIndex} className="appointmentBody name">{appointmentName}</div>
        <div index={appointmentIndex} className="appointmentBody time">{appointmentTime}</div>
      </div>
    </div>
  );
};

export default Appointment;