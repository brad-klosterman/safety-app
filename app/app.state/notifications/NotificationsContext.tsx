import React from 'react';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { createContextProvider } from '@utils';

import Alarms from '../alarms/AlarmsContext';
import type { AlarmModel } from '../alarms/types/AlarmModel';
import Profile from '../profile/ProfileProvider';
// import { AlarmNotification } from '@routes';
import { NotificationsReducer, INITIAL_NOTIFICATIONS_STATE } from './NotificationsReducer';
import {
    requestMessagingPermission,
    requestMessagingToken,
    verifyMessagingEnabled,
} from './actions';
import { usePushMessaging } from './usePushMessaging';

import type {
    NotificationsContextValue,
    NotificationsState,
    NotificationData,
    NotificationsReducerEvent,
} from './types/Notifications.types';

/**
 * NotificationsContext
 *
 **/

const [Context, useContext] = createContextProvider<NotificationsContextValue>({
    ...INITIAL_NOTIFICATIONS_STATE,
    updateState: () => null,
});

/**
 * Notifications Provider
 *
 **/
const Provider = (props: { children: React.ReactNode }) => {
    //const AuthenticationStorage = useAuthenticationStorage();
    const ProfileContext = Profile.useContext();
    const AlarmsContext = Alarms.useContext();

    /** Notifications State **/
    const [state, updateState] = React.useReducer<
        React.Reducer<NotificationsState, NotificationsReducerEvent>
    >(NotificationsReducer, INITIAL_NOTIFICATIONS_STATE);

    /** Notifications Action Handlers **/
    function handleIncomingAlarm(params: {
        title: string;
        message: string;
        alarm: AlarmModel | null | undefined;
    }) {
        const alarm = params.alarm;
        if (alarm) {
            updateState({
                type: 'UPDATE_NOTIFICATION_DATA',
                payload: { ...params, alarm },
            });
            AlarmsContext.updateState({
                type: 'STORE_INCOMING_OR_UPDATED_ALARM',
                payload: alarm,
            });
        }
    }

    /** Event Consumer/Callbacks **/
    // function onUserProfileRegistered() {
    //     requestMessagingToken().then(
    //         async (payload) => await API.UserProfile.setPushToken(payload)
    //     );
    // }

    // UserContext.subscribe(CONFIG.KEY).useEvent({
    //     type: 'USER_PROFILE_ONBOARDED',
    //     callback: onUserProfileRegistered,
    // });

    /** Push Messaging **/
    usePushMessaging({
        authorized: verifyMessagingEnabled(state.status),
        messageHandler: async (remote_message: FirebaseMessagingTypes.RemoteMessage) => {
            const title = remote_message.notification?.title || 'Notification';
            const message = remote_message.notification?.body || 'Message';
            const payload =
                typeof remote_message.data?.payload === 'string'
                    ? JSON.parse(remote_message.data?.payload)
                    : remote_message.data?.payload;

            const alarm_id = Number(payload.payload?.alarm_id);
            const alarm_source = payload.payload?.alarm_source;

            // alarm_source === 'home_alarm' &&
            //     APIContext.box_alarms
            //         .fetch({ id: alarm_id })
            //         .then((alarm) => handleIncomingAlarm({ title, message, alarm }));
            //
            // alarm_source === 'mobile_panic' &&
            //     APIContext.mobile_alarms
            //         .fetch({ id: alarm_id })
            //         .then((alarm) => handleIncomingAlarm({ title, message, alarm }));
        },
    });

    /** Notifications Context Value **/
    const context_value: NotificationsContextValue = {
        data: state.data,
        status: state.status,
        updateState,
    };

    return (
        <Context.Provider value={context_value}>
            {/*<AlarmNotification />*/}
            {props.children}
        </Context.Provider>
    );
};

/** Notifications Context Export **/
export default { Provider: React.memo(Provider), useContext };

//     useEffect(() => {
//         user.onboarded &&
//             requestMessagingPermission().then((payload) =>
//                 updateState({
//                     type: 'UPDATE_STATUS',
//                     payload,
//                 })
//             );
//     }, [user.onboarded]);
//
//     useEffect(() => {
//         user.onboarded &&
//             requestMessagingToken().then(async (payload) => await api.user.setPushToken(payload));
//
//         /** Called when a new registration token is generated for the device. */
//         return FirebaseMessaging().onTokenRefresh(
//             async (fcm_token) => user.onboarded && (await api.user.setPushToken(fcm_token))
//         );
//     }, [api.user, user.onboarded]);
