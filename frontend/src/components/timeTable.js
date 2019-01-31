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
  setCurrentAppointmentEditedState,
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
    for(let hour = this.props.initialHour, i = 0; hour < this.props.endHour + 1; hour++, i++) {
      hours.push({
        appointmentTime: moment({ hour }).format('h:mm A'),
        appointmentName: "+",
        appointmentIndex: i,
        edited: false
      });
    }
    // console.log(hours);
    this.props.dispatch(setAppointmentTimes(hours));
  }

  appointmentClick(event) {
    let index = parseInt(event.target.getAttribute("index"));
    let appointmentName = this.props.appointments[index].appointmentName;
    let appointmentTime = this.props.appointments[index].appointmentTime;
    this.props.dispatch(setCurrentAppointmentTime(appointmentTime));
    this.props.dispatch(setCurrentAppointmentName(appointmentName));
    this.props.dispatch(setCurrentAppointmentIndex(index));
    this.props.dispatch(setCurrentAppointmentEditedState(index))
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
            edited={appt.edited}
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