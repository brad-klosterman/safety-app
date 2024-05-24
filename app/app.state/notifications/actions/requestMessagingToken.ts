import FirebaseMessaging from '@react-native-firebase/messaging';

/**
 * FCM token handler
 * Send the token to SEON in order to receive push notifications
 */

async function requestMessagingToken(): Promise<string> {
    return await FirebaseMessaging().getToken();
}

export { requestMessagingToken };
