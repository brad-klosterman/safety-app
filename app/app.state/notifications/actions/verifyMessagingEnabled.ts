import { type FirebaseMessagingTypes } from '@react-native-firebase/messaging';

const verifyMessagingEnabled = (auth_status: FirebaseMessagingTypes.AuthorizationStatus) =>
    auth_status === 1 || auth_status === 2;

export { verifyMessagingEnabled };
