import axios from 'axios';
import instance from './Interceptor'
const LOGIN_URL = 'http://localhost:4000/login';
const REGISTER_URL = 'http://localhost:4000/register';
const LOGOUT_URL = 'http://localhost:4000/logout';
const FETCH_INTERNAL_ACCOUNT = 'http://localhost:4000/internal-account';
const CONTENT_URL = 'http://localhost:4000/';

export const getContent = () => instance.get(CONTENT_URL, {timeout: 5000});
export const submitLogin = (formValue) => axios.post(LOGIN_URL, formValue, {timeout: 5000});
export const submitRegister = (formValue) => axios.post(REGISTER_URL, formValue, {timeout: 5000});
export const doLogout = (data) => axios.delete(LOGOUT_URL, data);
export const fethInternalAccount = (data) => axios.post(FETCH_INTERNAL_ACCOUNT, data, {timeout: 5000});
