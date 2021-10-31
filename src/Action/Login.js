import * as api from '../User/Api';

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
                const notificationAction = { type: 'NOTIFICATION_TIMEOUT', message: 'Backend Down', notificationType: 'error' };
                dispatch(notificationAction);
            }, 1000);
        }
    }
}

export const doLogout= (token) => {
    return async (dispatch) => {
        try {
            await api.doLogout({ headers: {Authorization: `Bearer ${JSON.parse(token.accessToken)}` }}).then(({data}) => {
                if (data.status.code === '00') {
                    const loggedInAction = { type: 'LOGGED_OUT', data };
                    dispatch(loggedInAction);
                } else {
                    dispatch({ type: 'LOGOUT_FAILED', data });
                }
            })
        } catch (e) {
            setTimeout(() => {
                const progressAction = { type: 'IN_PROGRESS_DONE' };
                dispatch(progressAction);
                const notificationAction = { type: 'NOTIFICATION_TIMEOUT', message: 'Backend Down', notificationType: 'error' };
                dispatch(notificationAction);
            }, 1000);
        }
    }
}
