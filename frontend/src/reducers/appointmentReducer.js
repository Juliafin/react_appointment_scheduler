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
  RETRIEVE_APPOINTMENTS_CACHE,
  WRITE_APPOINTMENTS_CACHE,
  RESET_APPOINTMENTS,
  SHOW_DELETE_CONFIRMATION_MODAL,
  HIDE_DELETE_CONFIRMATION_MODAL,
  SET_REGISTRATION,
  UNSET_REGISTRATION,
  TOGGLE_REGISTRATION,
  SET_EMAIL,
  SET_PASSWORD,
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
  VALIDATE_SIGNIN_SIGNUP
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
  appointmentPhoneNumberFormTouched: false,
  showDeleteModal: false,
  registration: false,
  password: "",
  email: "",
  emailValid: false,
  passwordValid: false,
  signInSignUpFormValid: false
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
  case RETRIEVE_APPOINTMENTS_CACHE:
    if (state.guestMode) {
      let cachedAppointments = JSON.parse(localStorage.getItem("guest"));
      if (cachedAppointments) {
        return Object.assign({}, state, {appointments: cachedAppointments});
      }
    }
    return state;

  case WRITE_APPOINTMENTS_CACHE:
    if (state.guestMode) {
      localStorage.setItem("guest", JSON.stringify(state.appointments));
    }
    return state;
  case RESET_APPOINTMENTS:
    if (state.guestMode) {
      localStorage.setItem("guest", null);
      return Object.assign({}, state, {apppointments: []});
    }
    return state;
  case SHOW_DELETE_CONFIRMATION_MODAL:
    if (state.guestMode) {
      return Object.assign({}, state, {showDeleteModal: true});
    }
    return state;
  case HIDE_DELETE_CONFIRMATION_MODAL:
    if (state.guestMode) {
      return Object.assign({}, state, {showDeleteModal: false});
    }
    return state;
  case SET_REGISTRATION:
    return Object.assign({}, state, {registration: true});
  case UNSET_REGISTRATION:
    return Object.assign({}, state, {registration: false});
  case TOGGLE_REGISTRATION:
    return Object.assign({}, state, {registration: !state.registration});
  case SET_PASSWORD:
    return Object.assign({}, state, {password: action.password});
  case SET_EMAIL:
    return Object.assign({}, state, {email: action.email});
  case VALIDATE_EMAIL:
    const emailValid = new RegExp(/^.+@{1}.+\.[a-zA-Z]{2,4}$/);
    
    if (emailValid.test(state.email)) {
      return Object.assign({}, state, {emailValid: true});
    }
    return Object.assign({}, state, {emailValid: false});

  case VALIDATE_PASSWORD:
    const passwordValid = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$?%!/\{\}\[\]\(\)]).{6,20})/);
    if (passwordValid.test(state.password)) {
      return Object.assign({}, state, {passwordValid: true});
    }
    return Object.assign({}, state, {passwordValid: false});
  case VALIDATE_SIGNIN_SIGNUP:
    if (state.emailValid && state.passwordValid) {
      return Object.assign({}, state, {signInSignUpFormValid: true});
    }
    return Object.assign({}, state, {signInSignUpFormValid: false});
  default:
    return state;
  }
};