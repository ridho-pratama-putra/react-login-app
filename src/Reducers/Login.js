 const LoginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGGED_IN' :
            localStorage.setItem('accessToken', action.data.result[0].accessToken);
            localStorage.setItem('refreshToken', action.data.result[0].refreshToken);
            return { ...state, isAuthenticated: true, token: action.data.result[0].accessToken, refreshToken: action.data.result[0].refreshToken};
        case 'LOGGED_OUT' :
            localStorage.clear();
            return { ...state, isAuthenticated: false, token: null, refreshToken: null };
        case 'LOGIN_FAILED' :
            return { ...state, isAuthenticated: false, token: null, refreshToken: null };
        case 'LOGOUT_FAILED' :
            return { ...state };
        case 'FORCED_LOGGED_IN':
            return {...state, isAuthenticated:true, token: action.token, refreshToken: action.refreshToken}
        default:
            return state;
    }
};
 export default LoginReducer;
