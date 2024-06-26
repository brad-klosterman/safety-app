import * as LocalAuthentication from 'expo-local-authentication';

function detectBiometryType(types: LocalAuthentication.AuthenticationType[]) {
    let found = false;
    for (const type of types) {
        if (
            [
                LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
                LocalAuthentication.AuthenticationType.FINGERPRINT,
            ].indexOf(type) > -1
        ) {
            found = true;
            break;
        }
    }

    if (found) {
        return types.indexOf(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION) > -1
            ? LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
            : LocalAuthentication.AuthenticationType.FINGERPRINT;
    } else {
        return null;
    }
}

export { detectBiometryType };
