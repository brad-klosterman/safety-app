import React from 'react';
import { Alert, Linking } from 'react-native';
import { Camera } from 'expo-camera';

async function alertCameraPermissions() {
    await Alert.alert('Enable Camera Access', 'Please enable camera access to upload an image.', [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {
            text: 'Open Device Settings',
            onPress: async () => {
                await Linking.openSettings();
            },
        },
    ]);
}

function useCameraPermissions() {
    const [camera_permission, requestCameraPermission] = Camera.useCameraPermissions();
    const enabled = camera_permission && camera_permission.granted;

    return {
        enabled,
        requestPermission: React.useCallback(async (): Promise<boolean> => {
            return await requestCameraPermission().then(async ({ granted }) => {
                !granted && (await alertCameraPermissions());
                return granted;
            });
        }, [requestCameraPermission]),
    };
}

export { useCameraPermissions };
