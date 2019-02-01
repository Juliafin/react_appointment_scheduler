import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Row, Col, Input} from 'react-materialize';
import {
  hideModal, 
  setCurrentAppointmentName,
  setCurrentAppointmentPhoneNumber,
  setAppointmentTimes,
  updateAppointment,
  clearAppointment,
  setAppointmentEdited,
  validateAppointmentName,
  validatePhoneNumber,
  retrieveAppointmentsCache,
  writeAppointmentsCache,
  resetAppointments,
  showDeleteConfirmationModal,
  hideDeleteConfirmationModal,
  getAppointments,
  checkTokenAndUserExists
  
} from './../actions/appointmentActions';
import TimeTable from './../components/timeTable';
import generateTimes from './../utils/generateSchedule';
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
    this.validate = this.validate.bind(this);
    this.showConfirmationModal = this.showConfirmationModal.bind(this);
    this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
    this.deleteAppointments = this.deleteAppointments.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(checkTokenAndUserExists());
    if (this.props.guestMode) {
      this.props.dispatch(retrieveAppointmentsCache());
    } else {
      this.props.dispatch(setAppointmentTimes(generateTimes(this.props.initialHour, this.props.endHour)));
    }
    if (this.props.currentUserAuthenticated) {
      this.props.dispatch(getAppointments(this.props.currentUserToken));
    }
  }

  closeModal() {
    this.props.dispatch(hideModal());
    this.clearAppointment();
  }
  
  closeModalAndUpdate() {
    this.props.dispatch(hideModal());
    this.props.dispatch(updateAppointment());
    this.props.dispatch(setAppointmentEdited());
    this.props.dispatch(writeAppointmentsCache());
    this.clearAppointment();
  }

  validate() {
    this.props.dispatch(validateAppointmentName());
    this.props.dispatch(validatePhoneNumber());
  }

  clearAppointment() {
    this.props.dispatch(clearAppointment());
  }

  updateApptName(event) {
    let name = event.target.value;
    this.props.dispatch(setCurrentAppointmentName(name));
    this.props.dispatch(validateAppointmentName());
  }

  updateApptPhoneNumber(event) {
    let phoneNumber = event.target.value;
    this.props.dispatch(setCurrentAppointmentPhoneNumber(phoneNumber));
    this.props.dispatch(validatePhoneNumber());
  }

  updateAppointment() {
    this.props.dispatch(updateAppointment());
    
  }

  deleteAppointments() {
    this.props.dispatch(resetAppointments());
    this.props.dispatch(setAppointmentTimes(generateTimes(this.props.initialHour, this.props.endHour)));

    this.closeConfirmationModal();
  }

  closeConfirmationModal () {
    this.props.dispatch(hideDeleteConfirmationModal());
  }

  showConfirmationModal () {
    this.props.dispatch(showDeleteConfirmationModal());
  }
    
  render() {
    let modalHeader = this.props.currentAppointment.edited ? 'Update Appointment Details' : 'Create Appointment';
    let modalButtonText = this.props.currentAppointment.edited ? 'Update' : 'Create';
    return (
      <div className="slowPopIn">
        <div className="scheduleContainer">
          {this.props.guestMode ? (
            <div className="guestModeContainer">
              <Button 
                id="appointmentReset"
                waves="red"
                onClick={this.showConfirmationModal}>Reset Appointments
              </Button>
              <Modal
                header="Delete Appointments"
                modalOptions={{complete: this.closeConfirmationModal}}
                actions={[
                  <Button 
                    key="close" 
                    onClick={this.closeConfirmationModal}
                    waves="red"
                    id="closeConfirmationModal">
                  Close
                  </Button>,
                  <Button 
                    key="confirm"
                    onClick={this.deleteAppointments}
                    waves="green"
                    id="confirmConfirmationModal">
                  Confirm
                  </Button>
                ]}
                open={this.props.showDeleteModal}>
                <p>Are you sure you want to delete all appointments?</p>
              </Modal>
              <h5 className="guestMode">Guest mode</h5>
              <TimeTable/>
            </div>
          ):
            <div className="authenticated">
              <p>Welcome {this.props.currentUserEmail ? this.props.currentUserEmail : ''}</p>
              <TimeTable/>
            </div>
          }
        </div>

        <Modal
          header={modalHeader}
          open={this.props.showModal}
          fixedFooter
          actions={[
            <Button 
              id="closeModal" 
              key="close" 
              onClick={this.closeModal}>
              Close
            </Button>,
            <Button 
              id="updateModal" 
              key="updateModal" 
              onClick={this.closeModalAndUpdate}
              disabled={!this.props.appointmentNameValid || !this.props.phoneNumberValid}>
              {modalButtonText}
            </Button>
          ]}
          modalOptions={{complete: this.closeModal, ready: this.validate}}>
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
  showDeleteModal: state.showDeleteModal,
  initialHour: state.initialHour,
  endHour: state.endHour,
  currentUserAuthenticated: state.currentUserAuthenticated,
  currentUserToken: state.currentUserToken,
  currentUserID: state.currentUserID,
  currentUserEmail: state.currentUserEmail

});

export default connect(mapStateToProps)(Schedule);