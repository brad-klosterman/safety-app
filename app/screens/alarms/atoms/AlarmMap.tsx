import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { LocationObjectCoords } from 'expo-location';

import { MAP_THEME } from '@theme';
import { type LocationCoordinates, SCREEN_WIDTH, SCREEN_HEIGHT } from '@device';

import { AlarmMarker } from './AlarmMarker';

/** Map Config */
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function AlarmMap(props: {
    focused: boolean;
    coordinates: LocationObjectCoords | null;
    active_alarm: {
        coordinates: { latitude: number; longitude: number } | null;
    } | null;
    theme_variant: 'light' | 'dark';
}) {
    const map_ref = useRef<MapView>();

    const [markerCoordinates, setMarkerCoordinates] = useState<LocationCoordinates>({
        latitude: 0,
        longitude: 0,
    });

    const region = useMemo(
        () => ({
            latitude: props.coordinates?.latitude || 0,
            longitude: props.coordinates?.longitude || 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }),
        [props.coordinates]
    );

    const updateMarkerLocation = (new_region: Region) => {
        if (!props.active_alarm) {
            setMarkerCoordinates({
                latitude: new_region.latitude,
                longitude: new_region.longitude,
            });
        }
    };

    const getAlarmMarkerCoordinates = (): LocationCoordinates => {
        return props.active_alarm?.coordinates || markerCoordinates;
    };

    return (
        <MapView
            ref={(ref) => {
                map_ref.current = ref as MapView;
            }}
            userInterfaceStyle={props.theme_variant}
            style={[styles.map, { marginTop: 0 }]}
            customMapStyle={
                props.theme_variant === 'dark' ? MAP_THEME.GREY_SCALE_DARK : MAP_THEME.GREY_SCALE
            }
            provider={PROVIDER_GOOGLE}
            zoomEnabled={true}
            showsUserLocation={props.focused}
            region={region}
            showsMyLocationButton={props.focused}
            onRegionChangeComplete={updateMarkerLocation}
        >
            {props.focused && props.active_alarm && (
                <Marker
                    isPreselected={true}
                    draggable={true}
                    coordinate={getAlarmMarkerCoordinates()}
                    anchor={{ x: 0.5, y: 0.5 }}
                    opacity={1}
                >
                    <AlarmMarker is_active_alarm={Boolean(props.active_alarm)} />
                </Marker>
            )}
        </MapView>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttons: {
        position: 'absolute',
        width: '100%',
    },
});

export { AlarmMap };
