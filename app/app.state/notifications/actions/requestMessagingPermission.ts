import FirebaseMessaging, { type FirebaseMessagingTypes } from '@react-native-firebase/messaging';

/**
 * iOS requires that we ask permission before attempting to send notifications
 * we can only ask once or user need to go into their settings to turn on notifications manually.
 */

async function requestMessagingPermission(): Promise<FirebaseMessagingTypes.AuthorizationStatus> {
    return await FirebaseMessaging().requestPermission({
        providesAppNotificationSettings: true,
    });
}

export { requestMessagingPermission };
