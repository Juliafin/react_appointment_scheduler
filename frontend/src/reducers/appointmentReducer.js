import {ENABLE_GUEST_MODE, GET_IP_INFO_SUCCESS} from '../actions/appointmentActions';

const initialState = {
  currentUserID: '',
  appointments: [],
  guestMode: false,
  ipAvailable: false,
  ipData: null
};

export const appointmentReducer = (state=initialState, action) => {
  if (action.type === ENABLE_GUEST_MODE) {
    return Object.assign({}, state, {guestMode: true});
  } else if (action.type === GET_IP_INFO_SUCCESS) {
    return Object.assign({}, state, {ipData: action.ipData})
  }
  return state;
};