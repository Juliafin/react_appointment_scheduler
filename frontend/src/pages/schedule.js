import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Modal, Button, Row, Input} from 'react-materialize';
import {
  hideModal, 
  setCurrentAppointmentName,
  updateAppointment,
  clearAppointment,
  setAppointmentEdited
} from './../actions/appointmentActions';
import TimeTable from './../components/timeTable';
import './schedule.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.closeModalAndUpdate = this.closeModalAndUpdate.bind(this);
    this.updateApptName = this.updateApptName.bind(this);
    this.updateAppointment = this.updateAppointment.bind(this);
    this.clearAppointment = this.clearAppointment.bind(this);
  }

  closeModal() {
    this.props.dispatch(hideModal());
    // this.props.dispatch(clearAppointment());
  }
  
  closeModalAndUpdate() {
    this.props.dispatch(hideModal());
    this.props.dispatch(updateAppointment());
    this.props.dispatch(setAppointmentEdited());

  }

  clearAppointment() {
    this.props.dispatch(clearAppointment());
  }



  updateApptName(event) {
    let name = event.target.value;
    this.props.dispatch(setCurrentAppointmentName(name));
  }

  updateAppointment() {
    this.props.dispatch(updateAppointment());
  }


    
  
  render() {
    console.log(this.props.currentAppointment, 'this props current appointment in schedule js render')
    let modalHeader = this.props.currentAppointment.edited ? 'Update Appointment Details' : 'Create Appointment';
    let modalButtonText = this.props.currentAppointment.edited ? 'Update' : 'Create';
    return (
      <div>
        {this.props.guestMode ? (
          <div className="scheduleContainer">
            <h5 className="guestMode">Guest mode</h5>
            <TimeTable/>
          </div>
        ):
          <div style={{color:'white'}}>You are not in guest mode!</div>
        }

        <Modal
          header={modalHeader}
          open={this.props.showModal}
          fixedFooter
          actions={[
            <Button id="closeModal" key="close" onClick={this.closeModal}>Close</Button>,
            <Button id="updateModal" key="updateModal" onClick={this.closeModalAndUpdate}>{modalButtonText}</Button>
          ]}
          modalOptions={{complete: this.closeModal}}>
          <Row>
            <label htmlFor="appointmentName">Appointment Name</label>
            <Input
              id="appointmentName"
              onLabel="test"
              offLabel="hello"
              placeHolder={this.props.currentAppointment.appointmentName === '+' ? 'Enter an appointment' : ''}
              defaultValue={this.props.currentAppointment.appointmentName}
              value={this.props.currentAppointment.appointmentName === '+' ? '' : this.props.currentAppointment.appointmentName}
              onChange={this.updateApptName}>
            </Input>
          </Row>
          <Row>

            <div>Appointment Time: {this.props.currentAppointment.appointmentTime}</div>
          </Row>
          {this.props.appointmentValid ? null : <div className="error"></div>}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  guestMode: state.guestMode,
  showModal: state.showModal,
  currentAppointment: state.currentAppointment,
  appointments: state.appointments

});

export default connect(mapStateToProps)(Schedule);