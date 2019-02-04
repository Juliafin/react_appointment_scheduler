import axios from 'axios';
import history from './../history';
import * as actionTypes from './actionTypes';
// TODO Get appointments


export const getAppointmentsSuccess = () => ({
  type: actionTypes.GET_APPOINTMENTS_SUCCESS
});

export const getAppointments = (token) => (dispatch) => {
  const GET_APPOINTMENTS_ENDPOINT = "/api/appointments";
  let headers = {'Authorization': `bearer ${token}`};
  console.log('headers in get appointments', headers);
  axios.post(GET_APPOINTMENTS_ENDPOINT, {}, {headers})
    .then((response) => {
      console.log('inside get appointments success');
      console.log(response.data);
    })
    .catch((error) => {
      console.log('inside get appointments failure');
      console.log(error);
    });

};

export const logout = () => ({
  type: actionTypes.LOGOUT
});

export const signInSignUpFailed = () => ({
  type: actionTypes.SIGNIN_SIGN_UP_FAILED
});

export const signInSignUpFailedReset = () => ({
  type: actionTypes.SIGNIN_SIGN_UP_FAILED_RESET
  
});

export const checkTokenAndUserExists = () => ({
  type: actionTypes.CHECK_TOKEN_AND_USER_EXISTS
});


export const authenticateUserSuccess = () => ({
  type: actionTypes.AUTHENTICATE_USER_SUCCESS
});


export const authenticateUser = (token) => (dispatch) => {
  let AUTH_ENDPOINT = "/auth/authenticate";
  let headers = {'Authorization': `bearer ${token}`};

  axios.post(AUTH_ENDPOINT, {}, {headers})
    .then((authResponse) => {
      return dispatch(authenticateUserSuccess());
    });
};


export const registerUserSuccess = (token, email, _id) => ({
  type: actionTypes.REGISTER_USER_SUCCESS,
  token, email, _id
});

export const registerUser = (email, password) => (dispatch) => {
  let REGISTER_ENDPOINT = "/auth/register";
  axios.post(REGISTER_ENDPOINT, {email, password})
    .then((response) => {
      // dispatch a success action
      if (response.data.message === "User Created") {
        let {email, _id} = response.data.createdUser;
        let {token} = response.data;
        history.push('/schedule');
        return dispatch(registerUserSuccess(token, email, _id));
      }
    })
    .catch((error) => {
      console.log('There was an error registering');
      return dispatch(signInSignUpFailed());
    });
};


export const loginUserSuccess = (email, id, token) => ({
  type: actionTypes.LOGIN_USER_SUCCESS,
  email,
  id,
  token
});


export const loginUser = (email, password) => (dispatch) => {
  let LOGIN_ENDPOINT = '/auth/login';
  axios.post(LOGIN_ENDPOINT, {email, password})
    .then((response) => {
      if (response.data.message === "Successfully logged in") {
        let {email, _id} = response.data.loggedInUser;
        let {userToken} = response.data;
        
        history.push('/schedule');
        return dispatch(loginUserSuccess(email, _id, userToken));
      }
    })
    .catch((error) => {
      console.log(error, 'error in login');
      return dispatch(signInSignUpFailed());
    });
};


export const getIpInfoSuccess = (ipData) => ({
  type: actionTypes.GET_IP_INFO_SUCCESS,
  ipData
});
export const getIpInfo = () => (dispatch) => {
  let BASE_URL = '/service/ip';
  axios.get(BASE_URL)
    .then((response) => {
      // console.log(response);
      if (response.status === 200 && response.data.ipData.status !== 'fail') {
        return dispatch(getIpInfoSuccess(response.data.ipData));
      }
    })
    .catch((err) => console.log(err));
};


export const enableGuestMode = () => ({
  type: actionTypes.ENABLE_GUEST_MODE,
});



export const showModal = () => ({
  type: actionTypes.SHOW_MODAL
});


export const hideModal = () => ({
  type: actionTypes.HIDE_MODAL
});



export const setCurrentAppointmentTime = (appointmentTime) => ({
  type: actionTypes.SET_CURRENT_APPOINTMENT_TIME,
  appointmentTime: appointmentTime
});


export const setCurrentAppointmentName = (appointmentName) => ({
  type: actionTypes.SET_CURRENT_APPOINTMENT_NAME,
  appointmentName
});


export const setCurrentAppointmentIndex = (index) => ({
  type: actionTypes.SET_CURRENT_APPOINTMENT_INDEX,
  appointmentIndex: index
});


export const setCurrentAppointmentPhoneNumber = (appointmentPhoneNumber) => ({
  type: actionTypes.SET_CURRENT_APPOINTMENT_PHONE_NUMBER,
  appointmentPhoneNumber
});


export const setAppointmentTimes = (appointments) => ({
  type: actionTypes.SET_APPOINTMENT_TIMES,
  appointments
});


export const updateAppointment = () => ({
  type: actionTypes.UPDATE_APPOINTMENT,
});


export const clearAppointment = () => ({
  type: actionTypes.CLEAR_CURRENT_APPOINTMENT
});


export const setAppointmentEdited = () => ({
  type: actionTypes.SET_APPOINTMENT_EDITED
});


export const setCurrentAppointmentEditedState = (index) => ({
  type: actionTypes.SET_CURRENT_APPOINTMENT_EDIT_STATE,
  appointmentIndex: index
});


export const validatePhoneNumber = () => ({
  type: actionTypes.VALIDATE_PHONE_NUMBER
});


export const validateAppointmentName = () => ({
  type: actionTypes.VALIDATE_APPOINTMENT_NAME
});


export const writeAppointmentsCache = () => ({
  type: actionTypes.WRITE_APPOINTMENTS_CACHE
});


export const retrieveAppointmentsCache = () => ({
  type: actionTypes.RETRIEVE_APPOINTMENTS_CACHE
});


export const resetAppointments = () => ({
  type: actionTypes.RESET_APPOINTMENTS
});


export const showDeleteConfirmationModal = () => ({
  type: actionTypes.SHOW_DELETE_CONFIRMATION_MODAL
});


export const hideDeleteConfirmationModal = () => ({
  type: actionTypes.HIDE_DELETE_CONFIRMATION_MODAL
});


export const setRegistration = () => ({
  type: actionTypes.SET_REGISTRATION
});


export const unsetRegistration = () => ({
  type: actionTypes.UNSET_REGISTRATION
});


export const toggleRegistration = () => ({
  type: actionTypes.TOGGLE_REGISTRATION
});


export const setPassword = (password) => ({
  type: actionTypes.SET_PASSWORD,
  password
});


export const setEmail = (email) => ({
  type: actionTypes.SET_EMAIL,
  email
});


export const validateEmail = () => ({
  type: actionTypes.VALIDATE_EMAIL
});


export const validatePassword = () => ({
  type: actionTypes.VALIDATE_PASSWORD
});


export const validateSignInSignUp = () => ({
  type: actionTypes.VALIDATE_SIGNIN_SIGNUP
}); 
