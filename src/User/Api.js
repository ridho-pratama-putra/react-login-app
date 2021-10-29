import axios from 'axios';

const LOGIN_URL = 'http://localhost:4000/login';
const LOGOUT_URL = 'http://localhost:4000/logout';

export const submitLogin = (formValue) => axios.post(LOGIN_URL, formValue, { timeout: 5000 });
export const doLogout = (data) => axios.delete(LOGOUT_URL, data);
