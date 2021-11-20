import axios from 'axios';
import {useDispatch} from "react-redux";


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
                if (err.response.data.status.code === '06' && !err.response.data.status.description.includes('jwt')) {
                    return Promise.reject(err.response.data); // jika description selain your jwt invalid. contoh : not authorized
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
            } else if (err.response.status === 500) {
                return Promise.reject(err.response.data);
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }
        return Promise.reject(err);
    }
);

export default instance;
