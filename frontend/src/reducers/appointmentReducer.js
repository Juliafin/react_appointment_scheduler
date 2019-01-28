import {ENABLE_GUEST_MODE} from '../actions/appointmentActions';

const initialState = {
  currentUserID: '',
  appointments: [],
  guestMode: false
};

export const appointmentReducer = (state=initialState, action) => {
  if (action.type === ENABLE_GUEST_MODE) {
    return Object.assign({}, state, {guestMode: true});
  }
  return state;
};