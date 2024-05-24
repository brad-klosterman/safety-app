import { useEffect } from 'react';
import FirebaseMessaging, { type FirebaseMessagingTypes } from '@react-native-firebase/messaging';

/** Notification Background Handler */

let backgroundHandler: (arg: FirebaseMessagingTypes.RemoteMessage) => any = () => null;

let backgroundHandlerMarkReady: any = null;

const backgroundHandlerReady = new Promise((resolve) => {
    backgroundHandlerMarkReady = resolve;
});

FirebaseMessaging().setBackgroundMessageHandler(async (remote_message) => {
    if (!backgroundHandler) {
        await backgroundHandlerReady;
    }
    await backgroundHandler(remote_message);
});

/** Push Messaging Context */

// testing background message handler
// ensuring the notification opens the app from both background state and quit state
// alarm notifications ensuring the latest notification is shown with the current state of the alarm
// initial message

const usePushMessaging = (props: {
    authorized: boolean;
    messageHandler(remote_message: FirebaseMessagingTypes.RemoteMessage): void;
}) => {
    useEffect(() => {
        if (props.authorized) {
            return FirebaseMessaging().onMessage(async (remote_message) => {
                await props.messageHandler(remote_message);
            });
        }
    }, [props]);

    useEffect(() => {
        // Notification caused app to open from background state
        if (props.authorized) {
            FirebaseMessaging().onNotificationOpenedApp(async (remote_message) => {
                await props.messageHandler(remote_message);
            });
            // Notification caused app to open from quit state. check whether an initial notification is available
            FirebaseMessaging()
                .getInitialNotification()
                .then(async (remote_message) => {
                    if (remote_message) {
                        await props.messageHandler(remote_message);
                    }
                });

            backgroundHandler = async (remote_message) => {
                await props.messageHandler(remote_message);
            };
            backgroundHandlerMarkReady();
        }
    }, [props]);
};

export { usePushMessaging };
