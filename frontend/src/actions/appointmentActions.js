import axios from 'axios';

export const GET_APPOINTMENTS = "GET_APPOINTMENTS";

let BASE_URL_2 = 'http://localhost:9001/api/ip'
export const GET_IP_INFO_SUCCESS = "GET_IP_INFO_SUCCESS";
export const getIpInfoSuccess = (ipData) => ({
  type: GET_IP_INFO_SUCCESS,
  ipData
});


export const getIpInfo = () => (dispatch) => {
  let BASE_URL = 'http://73.43.238.115:9001/api/ip';
  axios.get(BASE_URL)
    .then((response) => {
      console.log(response);
      if (response.status === 200 && response.data.ipData.status !== 'fail') {
        return dispatch(getIpInfoSuccess(response.data.ipData));
      }
    })
    .catch((err) => console.log(err));
};

export const ENABLE_GUEST_MODE = "ENABLE_GUEST_MODE";
export const enableGuestMode = () => ({
  type: ENABLE_GUEST_MODE,
});