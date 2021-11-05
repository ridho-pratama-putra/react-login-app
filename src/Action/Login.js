import * as api from '../Page/Api';
export const submitLogin = (formData) => {
    return async (dispatch) => {
        const progressAction = { type: 'IN_PROGRESS' };
        dispatch(progressAction);
        try {
            await api.submitLogin(formData).then(({data}) => {
                if (data.status.code === '00') {
                    const loggedInAction = { type: 'LOGGED_IN', data };
                    dispatch(loggedInAction);
                } else {
                    setTimeout(() => {
                        const progressAction = { type: 'IN_PROGRESS_DONE' };
                        dispatch(progressAction);
                        const notificationAction = { type: 'NOTIFICATION_TIMEOUT', message: data.status.description, notificationType: 'error' };
                        dispatch(notificationAction);
                    }, 1000);
                }
            })
        } catch (e) {
            setTimeout(() => {
                const progressAction = { type: 'IN_PROGRESS_DONE' };
                dispatch(progressAction);
                const notificationAction = { type: 'NOTIFICATION_TIMEOUT', message: e.toString(), notificationType: 'error' };
                dispatch(notificationAction);
            }, 1000);
        }
    }
}

export const doLogout= (token) => {
    return async (dispatch) => {
        const progressAction = { type: 'IN_PROGRESS' };
        dispatch(progressAction);
        try {
            await api.doLogout({ headers: {Authorization: `Bearer ${token}` }}).then(({data}) => {
                if (data.status.code === '00') {
                    const loggedInAction = { type: 'LOGGED_OUT', data };
                    dispatch(loggedInAction);
                } else {
                    dispatch({ type: 'LOGOUT_FAILED', data });
                }
            })
        } catch (e) {
            setTimeout(() => {
                console.log(e)
                const progressAction = { type: 'IN_PROGRESS_DONE' };
                dispatch(progressAction);
                const notificationAction = { type: 'NOTIFICATION_TIMEOUT', message: e.toString(), notificationType: 'error' };
                dispatch(notificationAction);
            }, 1000);
        }
    }
}

export const submitRegister = (formData, history) => {

    return async (dispatch) => {
        const progressAction = { type: 'IN_PROGRESS' };
        dispatch(progressAction);
        try {
            await api.submitRegister(formData).then(({data}) => {
                if (data.status.code === '00') {
                    const registerSuccess = { type: 'NOTIFICATION_SUCCESS', message: 'You can login with your account now' };
                    dispatch(registerSuccess);
                    history.push('/login')
                } else {
                    setTimeout(() => {
                        const progressAction = { type: 'IN_PROGRESS_DONE' };
                        dispatch(progressAction);
                        const notificationAction = { type: 'NOTIFICATION_TIMEOUT', message: data.status.description, notificationType: 'error' };
                        dispatch(notificationAction);
                    }, 1000);
                }
            })
        } catch (e) {
            setTimeout(() => {
                const progressAction = { type: 'IN_PROGRESS_DONE' };
                dispatch(progressAction);
                const notificationAction = { type: 'NOTIFICATION_TIMEOUT', message: e.toString(), notificationType: 'error' };
                dispatch(notificationAction);
            }, 1000);
        }
    }
}

