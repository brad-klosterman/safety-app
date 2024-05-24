import type { NotificationsState, NotificationsReducerEvent } from './types/Notifications.types';

const INITIAL_NOTIFICATIONS_STATE: NotificationsState = {
    status: -1,
    data: [],
};

function NotificationsReducer(
    state: NotificationsState,
    action: NotificationsReducerEvent
): NotificationsState {
    switch (action.type) {
        case 'UPDATE_STATUS': {
            return {
                ...state,
                status: action.payload,
            };
        }
        case 'UPDATE_NOTIFICATION_DATA': {
            const updated_data = [...state.data];
            const index = updated_data.findIndex(
                (notification) => notification.alarm.id === action.payload.alarm.id
            );

            if (index !== -1) {
                updated_data[index] = action.payload;
            } else {
                updated_data.push(action.payload);
            }

            return {
                ...state,
                data: updated_data,
            };
        }
        case 'REMOVE_NOTIFICATION': {
            const updated_data = [...state.data];
            const index = updated_data.findIndex(
                (notification) => notification.alarm.id === action.payload.alarm_id
            );

            if (index !== -1) {
                updated_data.splice(index, 1);
                return {
                    ...state,
                    data: updated_data,
                };
            }

            return {
                ...state,
            };
        }

        default:
            return state;
    }
}

export { NotificationsReducer, INITIAL_NOTIFICATIONS_STATE };
