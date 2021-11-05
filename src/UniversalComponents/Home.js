import React from 'react';
import Cookies from 'js-cookie';
import {useDispatch} from "react-redux";

const Home = () => {
    const dispatch = useDispatch();

    if (Cookies.get('accessToken')) {
        localStorage.setItem('accessToken', Cookies.get('accessToken'))
        localStorage.setItem('refreshToken', Cookies.get('refreshToken'))
        Cookies.remove('refreshToken')
        Cookies.remove('accessToken')
        const loggedIn = {
            token: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken')
        };
        dispatch({type: 'FORCED_LOGGED_IN', data: loggedIn})
    }

    return (
        <div>
            this is home
        </div>
    );
};

export default Home;
