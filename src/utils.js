export const capitalFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const catchNetworkResponse = (e, dispatch) => {
    const {response} = e;
    if (response) {
        return setTimeout(() => {
            const progressAction = {type: 'IN_PROGRESS_DONE'};
            dispatch(progressAction);
            const notificationAction = {
                type: 'NOTIFICATION_TIMEOUT',
                message: capitalFirstLetter(response.data.status.description),
                notificationType: 'error'
            };
            dispatch(notificationAction);
        }, 1000);
    } else {
        setTimeout(() => {
            const progressAction = { type: 'IN_PROGRESS_DONE' };
            dispatch(progressAction);
            const notificationAction = { type: 'NOTIFICATION_TIMEOUT', message: e.toString(), notificationType: 'error' };
            dispatch(notificationAction);
        }, 1000);
    }
}