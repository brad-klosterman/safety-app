import React, { useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { type BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { type NavbarScreenName, NavbarScreenProps } from '@navigation/type.Navigation';
import { Profile, SSP, Alarms } from '@state';
import { useLocation, useGeofence } from '@device';
import Theme, { styled } from '@theme';
import { ScreenView, ActionSheet, getNavbarIcon } from '@components/elements';
import { Flex, Stack, Text } from '@components/ui';
import { AlarmMap, AlarmPanicButton } from './atoms';

/**
 *   Mobile Panic Screen
 *   -----
 *
 **/
function MobilePanic(props: NavbarScreenProps<'MobilePanic'>) {
    const route_focused = useIsFocused();

    /** Mobile Panic Screen State **/
    const [panic_button_visible, setPanicButtonVisibility] = useState(true);

    /** User Profile **/
    const ProfileContext = Profile.useContext();

    /** SSP **/
    const SSPContext = SSP.useContext();

    /** Alarms **/
    const AlarmsContext = Alarms.useContext();
    const active_alarm = AlarmsContext.state.active_mobile;
    const alarm_id = active_alarm?.id;
    const alarm_state = active_alarm?.state;

    /** Device **/
    const location = useLocation({
        tracking: route_focused,
    });
    const coverage = useGeofence({
        location_coordinates: location.coordinates,
        coverage_areas: SSPContext.coverage_areas,
        tracking: route_focused,
    });

    /** Theme **/
    const ThemeContext = Theme.useContext();
    const {
        navigation: { navbar },
    } = ThemeContext;

    /**
     *  Event Manager
     *  ---
     **/
    // active alarm state

    /**
     *  Action Handler
     *  ---
     **/
    // triggerAlarm
    // activateAlarm
    // openDeactivationForm

    const pressTriggerAlarm = React.useCallback(async () => {
        if (location.permissions?.granted) {
            setPanicButtonVisibility(false);
        } else {
            location.alertEnableLocation().then((enabled) => setPanicButtonVisibility(!enabled));
        }
    }, [location]);

    const styles = useStyles();

    return (
        <ScreenView paddingHorizontal="none">
            <AlarmMap
                focused={!panic_button_visible}
                coordinates={location.coordinates}
                active_alarm={active_alarm}
                theme_variant={ThemeContext.variant}
            />
            {panic_button_visible && (
                <>
                    <AlarmPanicButton
                        pressTriggerAlarm={pressTriggerAlarm}
                        locations_granted={location.permissions?.granted || false}
                        theme_variant={ThemeContext.variant}
                    />
                    {!coverage.inside_geofence && (
                        <Stack
                            style={styles.warning_info}
                            bottom={navbar.height + 32}
                        >
                            <Text
                                color="danger"
                                textAlign="center"
                            >
                                You are currently outside of the response area.
                            </Text>
                            <Text
                                color="danger"
                                textAlign="center"
                            >
                                Only external help can be provided.
                            </Text>
                        </Stack>
                    )}
                </>
            )}
        </ScreenView>
    );
}

const useStyles = styled((theme) => ({
    warning_info: {
        position: 'absolute',
        left: 24,
        right: 24,
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.s,
        gap: theme.spacing.xxs,
        backgroundColor: theme.colors.background_elevated_primary,
        borderColor: theme.colors.line,
        borderRadius: theme.borderRadii.s,
        borderWidth: 1,
    },
}));

MobilePanic.Options = {
    tabBarLabel: 'Mobile Panic',
    title: 'Mobile Panic',
    tabBarIcon: getNavbarIcon('home'),
    headerShown: false,
} as BottomTabNavigationOptions;

export { MobilePanic };

/*
headerTintColor: 'transparent',
    headerPressColor: 'transparent',
    headerTitle: () => null,
    headerShadowVisible: false,
    headerStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
 */
