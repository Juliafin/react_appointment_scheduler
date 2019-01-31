/* eslint-disable no-case-declarations */
import {
  ENABLE_GUEST_MODE,
  GET_IP_INFO_SUCCESS,
  SHOW_MODAL,
  HIDE_MODAL,
  SET_CURRENT_APPOINTMENT_NAME,
  SET_CURRENT_APPOINTMENT_TIME,
  SET_CURRENT_APPOINTMENT_INDEX,
  SET_CURRENT_APPOINTMENT_EDIT_STATE,
  SET_APPOINTMENT_EDITED,
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
          appointmentTime: action.appointmentTime, 
          ...state.currentAppointment
        }
      });
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
    console.log(state.currentAppointment, 'state current appointment in update appointment')
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
    console.log('state inside current appointment edit state', state);
    console.log('action in current appointment edit state', action)
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
  default:
    return state;
    
  }
};