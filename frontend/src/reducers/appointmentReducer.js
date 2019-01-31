/* eslint-disable no-case-declarations */
import {
  ENABLE_GUEST_MODE,
  GET_IP_INFO_SUCCESS,
  SHOW_MODAL,
  HIDE_MODAL,
  SET_CURRENT_APPOINTMENT_NAME,
  SET_CURRENT_APPOINTMENT_TIME,
  SET_CURRENT_APPOINTMENT_INDEX,
  SET_CURRENT_APPOINTMENT_PHONE_NUMBER,
  SET_CURRENT_APPOINTMENT_EDIT_STATE,
  SET_APPOINTMENT_EDITED,
  SET_APPOINTMENT_TIMES,
  UPDATE_APPOINTMENT,
  CLEAR_CURRENT_APPOINTMENT,
  VALIDATE_PHONE_NUMBER,
  VALIDATE_APPOINTMENT_NAME,
} from '../actions/appointmentActions';

export const initialState = {
  currentUserID: '',
  appointments: [],
  guestMode: false,
  ipAvailable: false,
  ipData: null,
  initialHour: 9,
  endHour: 17,
  currentAppointment: {},
  appointmentNameValid: false,
  phoneNumberValid: false,
  appointmentNameFormTouched: false,
  appointmentPhoneNumberFormTouched: false
};

export const appointmentReducer = (state=initialState, action) => {
  switch(action.type) {
  case ENABLE_GUEST_MODE:
    return Object.assign({}, state, {guestMode: true});
  case GET_IP_INFO_SUCCESS:
    return Object.assign({}, state, {ipData: action.ipData});
  case SHOW_MODAL:
    return Object.assign({}, state, {showModal: true});
  case HIDE_MODAL:
    return Object.assign({}, state, {showModal: false});
  case SET_APPOINTMENT_TIMES:
    return Object.assign({}, state, {appointments: action.appointments});
  case SET_CURRENT_APPOINTMENT_NAME:
    return Object.assign(
      {}, 
      state, 
      {
        currentAppointment: 
        {
          ...state.currentAppointment,
          appointmentName: action.appointmentName
        }
      }
    );
  case SET_CURRENT_APPOINTMENT_TIME:
    return Object.assign(
      {}, 
      state, {
        currentAppointment: {
          ...state.currentAppointment,
          appointmentTime: action.appointmentTime, 
        }
      });
  case SET_CURRENT_APPOINTMENT_PHONE_NUMBER:
    return Object.assign(
      {},
      state, {
        currentAppointment: {
          ...state.currentAppointment,
          appointmentPhoneNumber: action.appointmentPhoneNumber,
        }
      }
    );
  case SET_CURRENT_APPOINTMENT_INDEX:
    return Object.assign(
      {},
      state,
      {
        currentAppointment: {
          ...state.currentAppointment,
          appointmentIndex: action.appointmentIndex
        }
      }
    );
  case UPDATE_APPOINTMENT:
    if (!state.currentAppointment.appointmentName) {
      return state;
    }
    let updatedAppointments = state.appointments.slice();
    updatedAppointments[state.currentAppointment.appointmentIndex] = state.currentAppointment;
    if (!state.currentAppointment.edited) {
      state.currentAppointment.edited = true;
    }
    return Object.assign({}, state, {
      appointments: updatedAppointments,
      currentAppointment: {...state.currentAppointment}
    });
  case CLEAR_CURRENT_APPOINTMENT:
    return Object.assign({}, state, {currentAppointment: {}});
  case SET_APPOINTMENT_EDITED:

    let appointments = state.appointments.slice();
    appointments[state.currentAppointment.appointmentIndex].edited = true;

    return Object.assign({}, state, {appointments});
  
  case SET_CURRENT_APPOINTMENT_EDIT_STATE:
    return Object.assign(
      {},
      state,
      {
        currentAppointment: {
          ...state.currentAppointment,
          edited: state.appointments[action.appointmentIndex].edited
        }
      }
    );
  case VALIDATE_PHONE_NUMBER:
    let phoneNumber = state.currentAppointment.appointmentPhoneNumber;
    let phoneNumberValid = new RegExp(/^\d{3}-\d{3}-\d{4}$/);
    return Object.assign({}, state, {phoneNumberValid: phoneNumberValid.test(phoneNumber)});
  case VALIDATE_APPOINTMENT_NAME:
    return Object.assign({}, state, {appointmentNameValid: Boolean(state.currentAppointment.appointmentName)});
  default:
    return state;
  }
};