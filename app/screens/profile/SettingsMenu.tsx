import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { ScrollView } from 'react-native';
import {
    BottomTabHeaderProps,
    type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { Header as NavigationHeader, getHeaderTitle } from '@react-navigation/elements';
import { Octicons } from '@expo/vector-icons';

import { NavbarScreenName, type NavbarScreenProps } from '@navigation/type.Navigation';
import { useCameraPermissions } from '@device';
import { Profile } from '@state';
import { AlarmsManager } from '@screens/alarms/AlarmsManager';
import { ScreenView, ActionSheet, getNavbarIcon, Header } from '@components/elements';
import { Box, Flex, Text } from '@components/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfileHeader } from './atoms/ProfileHeader';

/**
 *  Event Management & Distribution
 *   -----
 *
 **/
function SettingsMenu(props: NavbarScreenProps<'SettingsMenu'>) {
    const navigate = props.navigation.navigate;

    const ProfileContext = Profile.useContext();
    const { profile } = ProfileContext;

    const camera_permission = useCameraPermissions();

    const openCamera = React.useCallback(async () => {
        let allowed = camera_permission.enabled;
        if (!allowed) camera_permission.requestPermission().then((granted) => (allowed = granted));
        //if (allowed) navigate('UserProfilePicture');
    }, [camera_permission]);

    if (!profile) return null;

    return (
        <ScreenView>
            <ProfileHeader {...{ openCamera, profile }} />
            <ActionSheet>
                <ActionSheet.Item
                    label="Personal Information"
                    type="nav"
                    icon="MenuPerson"
                    position="top"
                    onPress={() => navigate('UserDetails')}
                />
                <ActionSheet.Item
                    label="Medical Profile"
                    type="nav"
                    icon="MenuMedical"
                    position="middle"
                    onPress={() => navigate('UserMedical')}
                />
                <ActionSheet.Item
                    label="Contact Details"
                    type="nav"
                    icon="MenuEmergencyContact"
                    position="middle"
                    onPress={() => navigate('UserContacts')}
                />
                <ActionSheet.Item
                    label="User Settings"
                    type="nav"
                    icon="MenuSettings"
                    position="middle"
                    onPress={() => navigate('UserSettings')}
                />
                <ActionSheet.Item
                    label="Feedback"
                    type="nav"
                    icon="MenuFeedback"
                    position="middle"
                    onPress={() => navigate('ApplicationFeedback')}
                />
                <ActionSheet.Item
                    label="About The App"
                    type="nav"
                    icon="MenuAbout"
                    position="bottom"
                    onPress={() => navigate('ApplicationDetails')}
                />
            </ActionSheet>
        </ScreenView>
    );
}

SettingsMenu.Options = {
    title: 'Profile',
    tabBarLabel: 'Profile',
    tabBarIcon: getNavbarIcon('person'),
    header: (props) => {
        return (
            <Box
                paddingHorizontal="m"
                paddingBottom="s"
            >
                <Text
                    variant="large_title_bold"
                    textAlign={props.options.headerTitleAlign}
                >
                    {props.options.title}
                </Text>
            </Box>
        );
    },
    //headerMode: 'screen',
    headerShown: true,
    headerTintColor: 'transparent',
    headerPressColor: 'transparent',
    headerTitle: () => null,
    headerShadowVisible: false,
    headerStyle: {
        backgroundColor: 'transparent',
    },
} as BottomTabNavigationOptions;

SettingsMenu.useOptions = (): BottomTabNavigationOptions => {
    const insets = useSafeAreaInsets();

    return {
        title: 'Profile',
        tabBarLabel: 'Profile',
        tabBarIcon: getNavbarIcon('person'),
        // header: (props) => {
        //     return (
        //         <Box
        //             paddingHorizontal="m"
        //             paddingBottom="s"
        //         >
        //             <Text
        //                 variant="large_title_bold"
        //                 textAlign={props.options.headerTitleAlign}
        //             >
        //                 {props.options.title}
        //             </Text>
        //         </Box>
        //     );
        // },
        headerShown: true,
        headerTintColor: 'transparent',
        headerPressColor: 'transparent',
        headerTitle: () => null,
        headerShadowVisible: false,
        //labelVisible: false,
        headerStyle: {
            height: insets.top + 64,
            backgroundColor: 'transparent',
        },

        // headerMode: 'screen', // Stack Navigator: 'headerMode' is moved to 'options'. Moved it to 'screenOptions' to keep current behavior.
    };
};

export { SettingsMenu };

/*
    const insets = useSafeAreaInsets();

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerStyle: {
                height: insets.top + 64,
                backgroundColor: 'transparent',
            },
        });
    }, [insets.top, props.navigation]);
 */
