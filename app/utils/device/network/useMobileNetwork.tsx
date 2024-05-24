import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { NetworkStatus } from './types';

function useMobileNetwork() {
    const [network_status, setNetworkStatus] = useState<NetworkStatus>('loading');

    useEffect(() => {
        const network_subscription = NetInfo.addEventListener((network_state) => {
            if (network_state.isConnected === true && network_state.isInternetReachable === true) {
                setNetworkStatus('connected');
            }
            if (
                network_state.isConnected === false ||
                network_state.isInternetReachable === false
            ) {
                setNetworkStatus('disconnected');
                Alert.alert(
                    'No Internet Connection',
                    'Please ensure your network connection is active so we can receive your alert in the event of an emergency.',
                    [{ text: 'Ok', style: 'default' }]
                );
            }
        });

        return () => network_subscription();
    }, []);

    return {
        network_status,
    };
}

export { useMobileNetwork };
