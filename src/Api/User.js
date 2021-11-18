import axios from 'axios';

const LOGIN_URL = 'http://localhost:4000/login';
const REGISTER_URL = 'http://localhost:4000/register';
const LOGOUT_URL = 'http://localhost:4000/logout';
const FETCH_INTERNAL_ACCOUNT = 'http://localhost:4000/internal-account';
const CONTENT_URL = 'http://localhost:4000/';

function refreshToken() {
    return instance.post("/token", {
        refreshToken: getLocalRefreshToken(),
    },{timeout: 5000});
}

function getLocalAccessToken() {
    const accessToken = window.localStorage.getItem("accessToken");
    return accessToken;
}

function getLocalRefreshToken() {
    const refreshToken = window.localStorage.getItem("refreshToken");
    return refreshToken;
}

const instance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type": "application/json",
    },method: 'POST'
});

instance.interceptors.request.use(
    (config) => {
        // console.log('get access token :: ');
        const token = getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        // console.log('config :: ', config)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        // console.log('tidak ada response salah :: ', res);
        return res;
    },
    async (err) => {
        // console.log('err.response :: ', err);
        const originalConfig = err.config;
        // console.log('nih code eror nya di frontend :: ', err.response)
        if (err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                // console.log('masuk retry dan code 401 :: ');
                if (err.response.data.status.code === '06'
                    && !err.response.data.status.description.includes('jwt')
                ) {
                    return Promise.reject(err.response.data); // jika description selain your jwt invalid
                }
                originalConfig._retry = true;

                try {
                    const rs = await refreshToken();
                    const token = rs.data.result[0].accessToken;
                    // console.log('ini token baru :: ', token)
                    localStorage.setItem("accessToken", token);
                    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    return instance(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }

                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }
        return Promise.reject(err);
    }
);

export const getContent = () => instance.get(CONTENT_URL, {timeout: 5000});
export const submitLogin = (formValue) => axios.post(LOGIN_URL, formValue, {timeout: 5000});
export const submitRegister = (formValue) => axios.post(REGISTER_URL, formValue, {timeout: 5000});
export const doLogout = (data) => axios.delete(LOGOUT_URL, data);
export const fethInternalAccount = (data) => axios.post(FETCH_INTERNAL_ACCOUNT, data, {timeout: 5000});
