import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Appointment from './appointment';
import './timeTable.css';
import {
  showModal, 
  setCurrentAppointmentName, 
  setCurrentAppointmentIndex,
  setCurrentAppointmentTime,
  setCurrentAppointmentPhoneNumber,
  setCurrentAppointmentEditedState
} from '../actions/appointmentActions';


class TimeTable extends Component {
  constructor(props) {
    super(props);
    this.appointmentClick = this.appointmentClick.bind(this);
  }

  appointmentClick(event) {
    let index = parseInt(event.target.getAttribute("index"));
    let appointmentName = this.props.appointments[index].appointmentName;
    let appointmentTime = this.props.appointments[index].appointmentTime;
    let appointmentPhoneNumber = this.props.appointments[index].appointmentPhoneNumber;
    this.props.dispatch(setCurrentAppointmentTime(appointmentTime));
    this.props.dispatch(setCurrentAppointmentName(appointmentName));
    this.props.dispatch(setCurrentAppointmentPhoneNumber(appointmentPhoneNumber));
    this.props.dispatch(setCurrentAppointmentIndex(index));
    this.props.dispatch(setCurrentAppointmentEditedState(index));
    this.props.dispatch(showModal());

  }

  render() {
    let appointments = null;
    if (this.props.appointments) {
      appointments = this.props.appointments.map((appt, i) => {
        return (
          <Appointment 
            key={i} 
            appointmentTime={appt.appointmentTime} 
            appointmentName={appt.appointmentName}
            appointmentIndex={appt.appointmentIndex}
            appointmentPhoneNumber={appt.appointmentPhoneNumber}
            edited={appt.edited}
            onClick={this.appointmentClick}/>
        );
      });
    }
    return (
      <div>
        <div className="timeTable">
          <div className="appointmentHead name">Appointment Name</div>
          <div className="appointmentHead phoneNumber">Phone</div>
          <div className="appointmentHead time">Time</div>
        </div>
        {appointments}
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  appointments: state.appointments
});

TimeTable.propTypes = {
  appointments: PropTypes.array
};

export default connect(mapStateToProps)(TimeTable);