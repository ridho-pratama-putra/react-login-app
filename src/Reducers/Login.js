 const LoginReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOGGED_IN' :
            localStorage.setItem('accessToken', action.data.result[0].accessToken);
            localStorage.setItem('refreshToken', action.data.result[0].refreshToken);
            return { isAuthenticated: true, token: action.data.result[0].accessToken, refreshToken: action.data.result[0].refreshToken};
        case 'LOGGED_OUT' :
            localStorage.clear();
            return { isAuthenticated: false, token: null, refreshToken: null };
        case 'LOGIN_FAILED' :
            console.log('action failed login: ', action);
            return { isAuthenticated: false, token: null, refreshToken: null };
        case 'LOGOUT_FAILED' :
            console.log('action failed logout: ', action);
            return { };
        default:
            return state;
    }
};
 export default LoginReducer;
