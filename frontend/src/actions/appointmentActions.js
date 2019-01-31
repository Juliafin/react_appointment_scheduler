import axios from 'axios';

// TODO Get appointments
export const GET_APPOINTMENTS = "GET APPOINTMENTS";



let BASE_URL_2 = 'http://localhost:9001/api/ip';
export const GET_IP_INFO_SUCCESS = "GET_IP_INFO_SUCCESS";
export const getIpInfoSuccess = (ipData) => ({
  type: GET_IP_INFO_SUCCESS,
  ipData
});
export const getIpInfo = () => (dispatch) => {
  let BASE_URL = 'http://73.43.238.115:9001/api/ip';
  axios.get(BASE_URL)
    .then((response) => {
      // console.log(response);
      if (response.status === 200 && response.data.ipData.status !== 'fail') {
        return dispatch(getIpInfoSuccess(response.data.ipData));
      }
    })
    .catch((err) => console.log(err));
};

export const ENABLE_GUEST_MODE = "ENABLE GUEST MODE";
export const enableGuestMode = () => ({
  type: ENABLE_GUEST_MODE,
});


export const SHOW_MODAL = "SHOW MODAL";
export const showModal = () => ({
  type: SHOW_MODAL
});

export const HIDE_MODAL = "HIDE MODAL";
export const hideModal = () => ({
  type: HIDE_MODAL
});


export const SET_CURRENT_APPOINTMENT_TIME = "SET CURRENT APPOINTMENT TIME";
export const setCurrentAppointmentTime = (appointmentTime) => ({
  type: SET_CURRENT_APPOINTMENT_TIME,
  appointmentTime: appointmentTime
});

export const SET_CURRENT_APPOINTMENT_NAME = "SET CURRENT APPOINTMENT NAME";
export const setCurrentAppointmentName = (appointmentName) => ({
  type: SET_CURRENT_APPOINTMENT_NAME,
  appointmentName: appointmentName
});


export const SET_APPOINTMENT_TIMES = "SET APPOINTMENT TIMES";
export const setAppointmentTimes = (appointments) => ({
  type: SET_APPOINTMENT_TIMES,
  appointments
});


export const SET_CURRENT_APPOINTMENT_INDEX = "SET CURRENT APPOINTMENT INDEX";
export const setCurrentAppointmentIndex = (index) => ({
  type: SET_CURRENT_APPOINTMENT_INDEX,
  appointmentIndex: index
});


export const UPDATE_APPOINTMENT = "UPDATE APPOINTMENT" ;
export const updateAppointment = () => ({
  type: UPDATE_APPOINTMENT,
});

export const CLEAR_CURRENT_APPOINTMENT = "CLEAR CURRENT APPOINTMENT";
export const clearAppointment = () => ({
  type: CLEAR_CURRENT_APPOINTMENT
});

export const SET_APPOINTMENT_EDITED = "SET APPOINTMENT EDITED";
export const setAppointmentEdited = () => ({
  type: SET_APPOINTMENT_EDITED
});

export const SET_CURRENT_APPOINTMENT_EDIT_STATE = "SET CURRENT APPOINTMENT EDITED";
export const setCurrentAppointmentEditedState = (index) => ({
  type:SET_CURRENT_APPOINTMENT_EDIT_STATE,
  appointmentIndex: index
});
