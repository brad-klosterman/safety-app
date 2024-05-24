import { useEffect } from 'react';
import { Alert } from 'react-native';
import * as Updates from 'expo-updates';
import { eas_environment } from '../../../../environment/eas_environment';

const ENVIRONMENT = eas_environment.BUILD_PROFILE;

const useSoftwareUpdates = () => {
    useEffect(() => {
        if (ENVIRONMENT !== 'development')
            (async () => {
                try {
                    const update = await Updates.checkForUpdateAsync();

                    if (update.isAvailable) {
                        setTimeout(async () => {
                            Alert.alert(
                                'Update Available',
                                'Please update your software to the latest version. This will only take a moment.',
                                [
                                    {
                                        text: 'Later',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Ok',
                                        style: 'default',
                                        onPress: async () => {
                                            await Updates.fetchUpdateAsync();
                                            await Updates.reloadAsync();
                                        },
                                    },
                                ]
                            );
                        }, 120000);
                    }
                } catch (error) {
                    console.error(`Error fetching latest Expo update: ${error}`);
                }
            })();
    }, []);
};

export { useSoftwareUpdates };
