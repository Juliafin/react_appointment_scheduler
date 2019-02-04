/* eslint-disable no-case-declarations */
import * as actionTypes from '../actions/actionTypes';
import history from './../history';

export const initialState = {
  currentUserAuthenticated: false,
  currentUserID: '',
  currentUserToken: '',
  currentUserEmail: '',
  appointments: [],
  appointmentsSynced: false,
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
  signInSignUpFormValid: false,
  signInSignUpFailed: false
};

export const appointmentReducer = (state=initialState, action) => {
  switch(action.type) {
  case actionTypes.ENABLE_GUEST_MODE:
    return Object.assign({}, state, {guestMode: true});

  case actionTypes.GET_IP_INFO_SUCCESS:
    return Object.assign({}, state, {ipData: action.ipData});

  case actionTypes.SHOW_MODAL:
    return Object.assign({}, state, {showModal: true});

  case actionTypes.HIDE_MODAL:
    return Object.assign({}, state, {showModal: false});
  
  case actionTypes.SET_APPOINTMENT_TIMES:
    return Object.assign({}, state, {appointments: action.appointments});

  case actionTypes.SET_CURRENT_APPOINTMENT_NAME:
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

  case actionTypes.SET_CURRENT_APPOINTMENT_TIME:
    return Object.assign(
      {}, 
      state, {
        currentAppointment: {
          ...state.currentAppointment,
          appointmentTime: action.appointmentTime, 
        }
      });

  case actionTypes.SET_CURRENT_APPOINTMENT_PHONE_NUMBER:
    return Object.assign(
      {},
      state, {
        currentAppointment: {
          ...state.currentAppointment,
          appointmentPhoneNumber: action.appointmentPhoneNumber,
        }
      }
    );

  case actionTypes.SET_CURRENT_APPOINTMENT_INDEX:
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

  case actionTypes.UPDATE_APPOINTMENT:
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

  case actionTypes.CLEAR_CURRENT_APPOINTMENT:
    return Object.assign({}, state, {currentAppointment: {}});

  case actionTypes.SET_APPOINTMENT_EDITED:

    let appointments = state.appointments.slice();
    appointments[state.currentAppointment.appointmentIndex].edited = true;

    return Object.assign({}, state, {appointments});
  
  case actionTypes.SET_CURRENT_APPOINTMENT_EDIT_STATE:
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

  case actionTypes.VALIDATE_PHONE_NUMBER:
    let phoneNumber = state.currentAppointment.appointmentPhoneNumber;
    let phoneNumberValid = new RegExp(/^\d{3}-\d{3}-\d{4}$/);
    return Object.assign({}, state, {phoneNumberValid: phoneNumberValid.test(phoneNumber)});

  case actionTypes.VALIDATE_APPOINTMENT_NAME:
    return Object.assign({}, state, {appointmentNameValid: Boolean(state.currentAppointment.appointmentName)});

  case actionTypes.RETRIEVE_APPOINTMENTS_CACHE:
    if (state.guestMode) {
      let cachedAppointments = JSON.parse(localStorage.getItem("guest"));
      if (cachedAppointments) {
        return Object.assign({}, state, {appointments: cachedAppointments});
      }
    }
    return state;

  case actionTypes.WRITE_APPOINTMENTS_CACHE:
    if (state.guestMode) {
      localStorage.setItem("guest", JSON.stringify(state.appointments));
    }
    return state;

  case actionTypes.RESET_APPOINTMENTS:
    if (state.guestMode) {
      localStorage.setItem("guest", null);
      return Object.assign({}, state, {apppointments: []});
    }
    return state;

  case actionTypes.SHOW_DELETE_CONFIRMATION_MODAL:
    if (state.guestMode) {
      return Object.assign({}, state, {showDeleteModal: true});
    }
    return state;

  case actionTypes.HIDE_DELETE_CONFIRMATION_MODAL:
    if (state.guestMode) {
      return Object.assign({}, state, {showDeleteModal: false});
    }
    return state;

  case actionTypes.SET_REGISTRATION:
    return Object.assign({}, state, {registration: true});

  case actionTypes.UNSET_REGISTRATION:
    return Object.assign({}, state, {registration: false});

  case actionTypes.TOGGLE_REGISTRATION:
    return Object.assign({}, state, {registration: !state.registration});

  case actionTypes.SET_PASSWORD:
    return Object.assign({}, state, {password: action.password});

  case actionTypes.SET_EMAIL:
    return Object.assign({}, state, {email: action.email});

  case actionTypes.VALIDATE_EMAIL:
    const emailValid = new RegExp(/^.+@{1}.+\.[a-zA-Z]{2,4}$/);
    
    if (emailValid.test(state.email)) {
      return Object.assign({}, state, {emailValid: true});
    }
    return Object.assign({}, state, {emailValid: false});

  case actionTypes.VALIDATE_PASSWORD:
    const passwordValid = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$?%!/\{\}\[\]\(\)]).{6,20})/);
    if (passwordValid.test(state.password)) {
      return Object.assign({}, state, {passwordValid: true});
    }
    return Object.assign({}, state, {passwordValid: false});

  case actionTypes.VALIDATE_SIGNIN_SIGNUP:
    if (state.emailValid && state.passwordValid) {
      return Object.assign({}, state, {signInSignUpFormValid: true});
    }
    return Object.assign({}, state, {signInSignUpFormValid: false});
  
  case actionTypes.CHECK_TOKEN_AND_USER_EXISTS:
    let authInfo = JSON.parse(localStorage.getItem("auth"));
    if (authInfo){
      let {token, userEmail, userID} = authInfo;
      if (token && userID && userEmail) {
        return Object.assign(
          {}, state, {currentUserID: userID, currentUserToken: token, currentUserEmail: userEmail});
      }
    }
    return state;
  case actionTypes.REGISTER_USER_SUCCESS:
    
    localStorage.setItem("auth", JSON.stringify({
      token: action.token,
      userEmail: action.email,
      userID: action.id
    }));
    return Object.assign({}, state, {currentUserAuthenticated: true, currentUserEmail: action.email, currentUserID: action.id, currentUserToken: action.token});

  case actionTypes.AUTHENTICATE_USER_SUCCESS:
    return Object.assign({}, state, {currentUserAuthenticated: true});

  case actionTypes.LOGIN_USER_SUCCESS:
    localStorage.setItem("auth", JSON.stringify({
      token: action.token,
      userEmail: action.email,
      userID: action.id
    }));
    return Object.assign({}, state, {currentUserAuthenticated: true, currentUserEmail: action.email, currentUserID: action.id, currentUserToken: action.token});

  case actionTypes.LOGOUT:
    localStorage.setItem("auth", null);
    history.push('/');
    return Object.assign({}, state, {currentUserAuthenticated: false});

  case actionTypes.SIGNIN_SIGN_UP_FAILED:
    return Object.assign({}, state, {signInSignUpFailed: true});

  case actionTypes.SIGNIN_SIGN_UP_FAILED_RESET:
    return Object.assign({}, state, {signInSignUpFailed: false});

  case actionTypes.SYNC_MONGODB_APPOINTMENTS:
    if (action.appointments.length) {
      let stateAppointments = state.appointments.slice();

      stateAppointments = stateAppointments.map((stateApt) => {

        let {appointmentTime} = stateApt;
        let matchingAppointment = action.appointments.find((appt) => {
          return appt.time === appointmentTime;
        });
        if (matchingAppointment) {
          stateApt.appointmentName = matchingAppointment.appointmentName;
          stateApt.appointmentPhoneNumber = matchingAppointment.appointmentPhoneNumber;
          stateApt._id = matchingAppointment._id;
        }
        return stateApt;
      });
      return Object.assign({}, state, {appointmentsSynced: true, appointments: [...stateAppointments]});
    }
    return state;

  default:
    return state;
  }
};