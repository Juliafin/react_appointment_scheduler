import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Row, Col, Input} from 'react-materialize';
import {
  hideModal, 
  setCurrentAppointmentName,
  setCurrentAppointmentPhoneNumber,
  updateAppointment,
  clearAppointment,
  setAppointmentEdited,
  validateAppointmentName,
  validatePhoneNumber
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
    this.updateApptPhoneNumber = this.updateApptPhoneNumber.bind(this);
  }

  closeModal() {
    this.props.dispatch(hideModal());
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
    this.props.dispatch(validateAppointmentName(name));
  }

  updateApptPhoneNumber(event) {
    let phoneNumber = event.target.value;
    this.props.dispatch(setCurrentAppointmentPhoneNumber(phoneNumber));
    this.props.dispatch(validatePhoneNumber(phoneNumber));
  }

  updateAppointment() {
    this.props.dispatch(updateAppointment());
  }
    
  render() {
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
            <Button 
              id="updateModal" 
              key="updateModal" 
              onClick={this.closeModalAndUpdate}
              disabled={!this.props.appointmentNameValid || !this.props.phoneNumberValid}>
              {modalButtonText}
            </Button>
          ]}
          modalOptions={{complete: this.closeModal}}>
          <Row>
            <Col l={6}>
              <Input
                id="appointmentName"
                placeholder={['+', ''].indexOf(this.props.currentAppointment.appointmentName) === -1 ? '' : 'Enter an appointment'}
                defaultValue={this.props.currentAppointment.appointmentName}
                value={this.props.currentAppointment.appointmentName === '+' ? '' : this.props.currentAppointment.appointmentName}
                onChange={this.updateApptName}
                error={!this.props.appointmentNameValid ? 'Enter an appointment name' : ''}
                success={this.props.appointmentNameValid ? '\u2713' : ''}
                label="Appointment Name">
              </Input>
            </Col>
            <Col l={6}>
              <Input
                id="appointmentPhoneNumber"
                placeholder={this.props.currentAppointment.appointmentPhoneNumber === '' ? '123-123-5123': ''}
                value={this.props.currentAppointment.appointmentPhoneNumber === '' ? '' : this.props.currentAppointment.appointmentPhoneNumber}
                onChange={this.updateApptPhoneNumber}
                label="Appointment Phone Number"
                error={!this.props.phoneNumberValid ? '123-456-7890' : ''}
                success={this.props.phoneNumberValid ? '\u2713': ''}>
              </Input>
            </Col>
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
  appointments: state.appointments,
  appointmentNameValid: state.appointmentNameValid,
  phoneNumberValid: state.phoneNumberValid,
  appointmentNameFormTouched: state.appointmentNameFormTouched,
  appointmentPhoneNumberFormTouched: state.appointmentPhoneNumberFormTouched

});

export default connect(mapStateToProps)(Schedule);