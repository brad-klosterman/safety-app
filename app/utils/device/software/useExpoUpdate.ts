import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Updates from 'expo-updates';

function useExpoUpdate() {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [downloadingUpdate, setDownloadingUpdate] = useState(false);

    const checkForUpdate = useCallback(async () => {
        if (!__DEV__) {
            try {
                const { isAvailable } = await Updates.checkForUpdateAsync();
                setUpdateAvailable(isAvailable);
            } catch (err: any) {
                Alert.alert('Check failed', err.message);
            }
        }
    }, []);

    const downloadUpdate = useCallback(async () => {
        setDownloadingUpdate(true);
        const version = await Updates.fetchUpdateAsync();
        if (version.isNew) {
            await Updates.reloadAsync();
        } else {
            setDownloadingUpdate(false);
        }
    }, []);

    useEffect(() => {
        checkForUpdate();
    }, [checkForUpdate]);

    return {
        updateAvailable,
        checkForUpdate,
        downloadingUpdate,
        downloadUpdate,
    };
}

export { useExpoUpdate };
