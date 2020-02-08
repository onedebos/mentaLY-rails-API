import axios from 'axios';

export function loadLoginStatus() {
  return dispatch => {
    return axios.get('/api/v1/logged_in').then(response => {
      dispatch(checkLoginStatus(response.data.logged_in));
    });
  };
}
export function checkLoginStatus(logged_in) {
  return {
    type: 'LOGGED_IN_STATUS',
    status: logged_in,
  };
}
