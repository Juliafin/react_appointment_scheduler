import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import Appointment from './appointment';
import './timeTable.css';
import {
  showModal, 
  setCurrentAppointmentName, 
  setCurrentAppointmentIndex,
  setCurrentAppointmentTime,
  setAppointmentTimes
} from '../actions/appointmentActions';


class TimeTable extends Component {
  constructor(props) {
    super(props);
    this.appointmentClick = this.appointmentClick.bind(this);
  }

  componentDidMount() {
    this.generateTimes();
  }

  generateTimes() {
    const hours = [];
    console.log('this props', this.props);
    for(let hour = this.props.initialHour, i = 0; hour < this.props.endHour + 1; hour++, i++) {
      hours.push({
        appointmentTime: moment({ hour }).format('h:mm A'),
        appointmentName: "This is a test",
        appointmentIndex: i,
        edited: false
      });
      console.log('inside loop');
    }
    console.log(hours);
    this.props.dispatch(setAppointmentTimes(hours));
  }

  appointmentClick(event) {
    console.log('This is the event', event.target);
    let index = parseInt(event.target.getAttribute("index"));
    let appointmentName = this.props.appointments[index].appointmentName;
    let appointmentTime = this.props.appointments[index].appointmentTime;
    console.log(appointmentName, appointmentTime);
    this.props.dispatch(setCurrentAppointmentTime(appointmentTime));
    this.props.dispatch(setCurrentAppointmentName(appointmentName));
    this.props.dispatch(setCurrentAppointmentIndex(index));
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
            onClick={this.appointmentClick}/>
        );
      });
    }
    return (
      <div>
        <div className="timeTable">
          <div className="appointmentHead name">Appointment Name</div>
          <div className="appointmentHead time">Appointment Time</div>
        </div>
        {appointments}
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  initialHour: state.initialHour,
  endHour: state.endHour,
  appointments: state.appointments
});

export default connect(mapStateToProps)(TimeTable);