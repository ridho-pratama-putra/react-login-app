import axios from 'axios';

const LOGIN_URL = 'http://localhost:4000/login';
const REGISTER_URL = 'http://localhost:4000/register';
const LOGOUT_URL = 'http://localhost:4000/logout';

export const submitLogin = (formValue) => axios.post(LOGIN_URL, formValue, { timeout: 5000 });
export const submitRegister = (formValue) => axios.post(REGISTER_URL, formValue, { timeout: 5000 });
export const doLogout = (data) => axios.delete(LOGOUT_URL, data);
