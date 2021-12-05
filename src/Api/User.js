import axios from 'axios';
const LOGIN_URL = 'http://localhost/auth';
const REGISTER_URL = 'http://localhost/user';
const FETCH_INTERNAL_ACCOUNT = 'http://localhost/internal-account';
const CONTENT_URL = 'http://localhost/contents';

export const getContent = () => axios.get(CONTENT_URL, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
});
export const submitLogin = (formValue) => axios.post(LOGIN_URL, formValue, {timeout: 5000});
export const submitRegister = (formValue) => axios.post(REGISTER_URL, formValue, {timeout: 5000});
export const fethInternalAccount = (data) => axios.post(FETCH_INTERNAL_ACCOUNT, data, {timeout: 5000});
