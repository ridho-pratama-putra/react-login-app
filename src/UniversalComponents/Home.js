import React from 'react';
import Cookies from 'js-cookie';
const Home = () => {
    if (Cookies.get('accessToken')) {
        localStorage.setItem('accessToken', Cookies.get('accessToken'))
        localStorage.setItem('refreshToken', Cookies.get('refreshToken'))
    }
    return (
        <div>
            this is home
        </div>
    );
};

export default Home;
