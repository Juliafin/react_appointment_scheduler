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
  appointmentName
});

export const SET_CURRENT_APPOINTMENT_INDEX = "SET CURRENT APPOINTMENT INDEX";
export const setCurrentAppointmentIndex = (index) => ({
  type: SET_CURRENT_APPOINTMENT_INDEX,
  appointmentIndex: index
});

export const SET_CURRENT_APPOINTMENT_PHONE_NUMBER = "SET CURRENT APPOINTMENT PHONE NUMBER";
export const setCurrentAppointmentPhoneNumber = (appointmentPhoneNumber) => ({
  type: SET_CURRENT_APPOINTMENT_PHONE_NUMBER,
  appointmentPhoneNumber
});

export const SET_APPOINTMENT_TIMES = "SET APPOINTMENT TIMES";
export const setAppointmentTimes = (appointments) => ({
  type: SET_APPOINTMENT_TIMES,
  appointments
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
  type: SET_CURRENT_APPOINTMENT_EDIT_STATE,
  appointmentIndex: index
});

export const VALIDATE_PHONE_NUMBER = "VALIDATE PHONE NUMBER";
export const validatePhoneNumber = () => ({
  type: VALIDATE_PHONE_NUMBER
});

export const VALIDATE_APPOINTMENT_NAME = "VALIDATE APPOINTMENT NAME";
export const validateAppointmentName = () => ({
  type: VALIDATE_APPOINTMENT_NAME
});

export const WRITE_APPOINTMENTS_CACHE = "WRITE APPOINTMENTS CACHE";
export const writeAppointmentsCache = () => ({
  type: WRITE_APPOINTMENTS_CACHE
});

export const RETRIEVE_APPOINTMENTS_CACHE = "RETRIEVE APPOINTMENTS CACHE";
export const retrieveAppointmentsCache = () => ({
  type: RETRIEVE_APPOINTMENTS_CACHE
});

export const RESET_APPOINTMENTS = "RESET APPOINTMENTS";
export const resetAppointments = () => ({
  type: RESET_APPOINTMENTS
});

export const SHOW_DELETE_CONFIRMATION_MODAL = "SHOW DELETE CONFIRMATION MODAL";
export const showDeleteConfirmationModal = () => ({
  type: SHOW_DELETE_CONFIRMATION_MODAL
});

export const HIDE_DELETE_CONFIRMATION_MODAL = "HIDE DELETE CONFIRMATION MODAL";
export const hideDeleteConfirmationModal = () => ({
  type: HIDE_DELETE_CONFIRMATION_MODAL
});

export const SET_REGISTRATION = "SET_REGISTRATION";
export const setRegistration = () => ({
  type: SET_REGISTRATION
});

export const UNSET_REGISTRATION = "UNSET_REGISTRATION";
export const unsetRegistration = () => ({
  type: UNSET_REGISTRATION
});

export const TOGGLE_REGISTRATION = "TOGGLE REGISTRATION";
export const toggleRegistration = () => ({
  type: TOGGLE_REGISTRATION
});

export const SET_PASSWORD = "SET PASSWORD";
export const setPassword = (password) => ({
  type: SET_PASSWORD,
  password
});

export const SET_EMAIL = "SET EMAIL";
export const setEmail = (email) => ({
  type: SET_EMAIL,
  email
});

export const VALIDATE_EMAIL = "VALIDATE EMAIL";
export const validateEmail = () => ({
  type: VALIDATE_EMAIL
});

export const VALIDATE_PASSWORD = "VALIDATE PASSWORD";
export const validatePassword = () => ({
  type: VALIDATE_PASSWORD
});

export const VALIDATE_SIGNIN_SIGNUP = "VALIDATE SIGNIN SIGNUP";
export const validateSignInSignUp = () => ({
  type: VALIDATE_SIGNIN_SIGNUP
}); 