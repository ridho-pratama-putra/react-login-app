import axios from 'axios';
import instance from './Interceptor'
const LOGIN_URL = 'http://localhost/auth';
const REGISTER_URL = 'http://localhost/user';
const FETCH_INTERNAL_ACCOUNT = 'http://localhost/internal-account';
const CONTENT_URL = 'http://localhost/';

export const getContent = () => instance.get(CONTENT_URL, {timeout: 5000});
export const submitLogin = (formValue) => axios.post(LOGIN_URL, formValue, {timeout: 5000});
export const submitRegister = (formValue) => axios.post(REGISTER_URL, formValue, {timeout: 5000});
export const fethInternalAccount = (data) => axios.post(FETCH_INTERNAL_ACCOUNT, data, {timeout: 5000});
