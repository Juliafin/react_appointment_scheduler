/* eslint-disable no-case-declarations */
import {
  ENABLE_GUEST_MODE,
  GET_IP_INFO_SUCCESS,
  SHOW_MODAL,
  HIDE_MODAL,
  SET_CURRENT_APPOINTMENT_NAME,
  SET_CURRENT_APPOINTMENT_TIME,
  SET_CURRENT_APPOINTMENT_INDEX,
  SET_APPOINTMENT_TIMES,
  UPDATE_APPOINTMENT,
  CLEAR_CURRENT_APPOINTMENT
} from '../actions/appointmentActions';

export const initialState = {
  currentUserID: '',
  appointments: [],
  guestMode: false,
  ipAvailable: false,
  ipData: null,
  initialHour: 9,
  endHour: 17,
  currentAppointment: {}
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
          appointmentTime: state.currentAppointment.appointmentTime, 
          appointmentIndex: state.currentAppointment.appointmentIndex,
          appointmentName: action.appointmentName
        }
      }
    );
  case SET_CURRENT_APPOINTMENT_TIME:
    return Object.assign(
      {}, 
      state, {
        currentAppointment: {
          appointmentTime: action.appointmentTime, 
          appointmentName: state.currentAppointment.appointmentName,
          appointmentIndex: state.currentAppointment.appointmentIndex
        }
      });
  case SET_CURRENT_APPOINTMENT_INDEX:
    console.log('inside set appointment index!', action);
    let S = Object.assign(
      {},
      state,
      {
        currentAppointment: {
          appointmentTime: state.currentAppointment.appointmentTime,
          appointmentName: state.currentAppointment.appointmentName,
          appointmentIndex: action.appointmentIndex
        }
      }
    );
    console.log(S, 'STATTTTTTTTTTTTTE');
    return S;
  case UPDATE_APPOINTMENT:
    if (!state.currentAppointment.appointmentName) {
      return state;
    }
    let appointments = state.appointments.map((appt, index) => {
      console.log(state.currentAppointment.appointmentIndex, 'current index inside appointments map');
      if (index === state.currentAppointment.appointmentIndex) {
        return state.currentAppointment;
      } else {
        return appt;
      }
      
      
    });
    console.log('inside update appointment!');
    console.log(appointments);
    return Object.assign({}, state, {appointments});
  case CLEAR_CURRENT_APPOINTMENT:
    return Object.assign({}, state, {currentAppointment: {}});
  default:
    return state;
    
  }
};