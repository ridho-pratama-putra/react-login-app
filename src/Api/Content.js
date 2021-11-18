import axios from 'axios';

const CONTENT_URL = 'http://localhost:4001/';

export const submitLogin = () => axios.get(CONTENT_URL, {timeout: 5000});
