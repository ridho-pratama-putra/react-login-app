import * as api from '../Api/User';
import {catchNetworkResponse} from '../utils';

export const submitLogin = (formData) => {
    return async (dispatch) => {
        const progressAction = {type: 'IN_PROGRESS'};
        dispatch(progressAction);
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
                    const loggedInAction = {type: 'LOGGED_OUT', data};
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
        // const progressAction = {type: 'IN_PROGRESS'};
        // dispatch(progressAction);
        try {
            await api.getContent().then(res => {
            console.log('res from get ::', res)
            })
        } catch (e) {
            catchNetworkResponse(e, dispatch)
        }
    }
}
