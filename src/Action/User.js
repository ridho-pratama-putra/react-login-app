import * as api from '../Api/User';
import {catchNetworkResponse} from '../utils';

export const submitLogin = (formData) => {
    return async (dispatch) => {
        try {
            await api.submitLogin(formData).then(({data}) => {
                if (data.status.code === '00') {
                    const loggedInAction = {type: 'LOGGED_IN', data};
                    dispatch(loggedInAction);
                }
            })
        } catch (e) {
            catchNetworkResponse(e, dispatch)
        }
    }
}

export const doLogout = (token) => {
    return async (dispatch) => {
        const progressAction = {type: 'IN_PROGRESS'};
        dispatch(progressAction);
        try {
            await api.doLogout({headers: {Authorization: `Bearer ${token}`}}).then(({data}) => {
                if (data.status.code === '00') {
                    const loggedInAction = {type: 'LOGGED_OUT'};
                    dispatch(loggedInAction);
                }
            })
        } catch (e) {
            catchNetworkResponse(e, dispatch)
        }
    }
}

export const submitRegister = (formData, history) => {

    return async (dispatch) => {
        const progressAction = {type: 'IN_PROGRESS'};
        dispatch(progressAction);
        try {
            await api.submitRegister(formData).then(({data}) => {
                if (data.status.code === '00') {
                    const registerSuccess = {
                        type: 'NOTIFICATION_SUCCESS',
                        message: 'You can login with your account now'
                    };
                    dispatch(registerSuccess);
                    history.push('/login')
                }
            })
        } catch (e) {
            catchNetworkResponse(e, dispatch)
        }
    }
}

export const getContent = () => {
    return async (dispatch) => {
        const progressAction = {type: 'IN_PROGRESS'};
        dispatch(progressAction);
        try {
            await api.getContent().then(res => {
                dispatch({type: 'NOTIFICATION_SUCCESS', message:res.data.status.description})
            })
        } catch (e) {
            if (e.status && e.status.description.includes('relogin')) {
                dispatch({type: 'LOGGED_OUT'})
            }
            catchNetworkResponse(e, dispatch)
        }
        // console.log('kena catsh ih : ', e)
    }
}
