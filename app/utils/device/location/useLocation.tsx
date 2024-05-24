import React, { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import type { LocationObjectCoords, LocationSubscription } from 'expo-location';
import * as Location from 'expo-location';
import { type Lazy, LazyState } from '@utils';

const timeout = 10000;
let foreground_subscription: LocationSubscription;

const useLocation = (props: { tracking: boolean }) => {
    const [permissions, requestPermission] = Location.useForegroundPermissions();

    const [subscribed_coordinates, setSubscribedCoordinates] =
        useState<LocationObjectCoords | null>(null);

    const [exact_coordinates, setExactCoordinates] = useState<Lazy<LocationObjectCoords | null>>({
        state: LazyState.UN_INITIALIZED,
        data: null,
    });

    const [rough_coordinates, setRoughCoordinates] = useState<Lazy<LocationObjectCoords | null>>({
        state: LazyState.UN_INITIALIZED,
        data: null,
    });

    /**
     * Helper for requesting coordinates due to android having a timeout bug
     */
    const getCurrentLocation = React.useCallback(
        async ({
            accuracy,
        }: {
            accuracy: Location.Accuracy;
        }): Promise<Location.LocationObject | null> => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(null);
                }, timeout * 2);
                setTimeout(async () => {
                    resolve(await Location.getLastKnownPositionAsync());
                }, timeout);
                resolve((async () => await Location.getCurrentPositionAsync({ accuracy }))());
            });
        },
        []
    );

    const requestCoordinates = React.useCallback(() => {
        setRoughCoordinates({
            state: LazyState.LOADING,
        });
        setExactCoordinates({
            state: LazyState.LOADING,
        });
        getCurrentLocation({ accuracy: Location.Accuracy.Lowest })
            .then((location_data) => {
                if (location_data) {
                    setRoughCoordinates({
                        state: LazyState.SUCCESS,
                        data: location_data.coords,
                    });
                }
            })
            .catch(() => {
                setRoughCoordinates({
                    state: LazyState.ERROR,
                });
            });
        getCurrentLocation({ accuracy: Location.Accuracy.Highest })
            .then((location_data) => {
                if (location_data) {
                    setExactCoordinates({
                        state: LazyState.SUCCESS,
                        data: location_data.coords,
                    });
                }
            })
            .catch(() => {
                setExactCoordinates({
                    state: LazyState.ERROR,
                });
            });
    }, []);

    const alertEnableLocation = React.useCallback(async () => {
        let can_proceed = false;
        await Alert.alert(
            'Location Services',
            'Please enable location services so we can locate you in the event of an emergency.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Enable Location',
                    onPress: async () => {
                        if (permissions?.canAskAgain) {
                            const request_response = await requestPermission();
                            if (request_response.granted) {
                                can_proceed = true;
                            }
                        } else {
                            await Linking.openSettings();
                            can_proceed = false;
                        }
                    },
                },
            ]
        );
        return can_proceed;
    }, [permissions?.canAskAgain, requestPermission]);

    useEffect(() => {
        const is_enabled =
            permissions?.status === Location.PermissionStatus.GRANTED && props.tracking;

        // Start location tracking in foreground
        const startTracking = async () => {
            // Make sure that foreground location tracking is not running
            foreground_subscription?.remove();
            // Start watching position in real-time
            foreground_subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.Highest,
                },
                (updated_location) => {
                    setSubscribedCoordinates(updated_location.coords);
                }
            );
        };

        if (is_enabled) {
            requestCoordinates();
            startTracking();
        }

        return () => {
            // Stop location tracking in foreground
            foreground_subscription?.remove();
            setSubscribedCoordinates(null);
            // setLocation(null);
        };
    }, [props.tracking, permissions, requestCoordinates]);

    let coordinates: LocationObjectCoords | null = null;
    let accuracy: 'subscribed' | 'highest' | 'lowest';

    if (subscribed_coordinates) {
        coordinates = subscribed_coordinates;
        accuracy = 'subscribed';
    } else if (exact_coordinates.data) {
        coordinates = exact_coordinates.data;
        accuracy = 'highest';
    } else {
        coordinates = rough_coordinates.data || null;
        accuracy = 'lowest';
    }

    return {
        accuracy,
        coordinates,
        permissions,
        alertEnableLocation,
    };
};

export { useLocation };
