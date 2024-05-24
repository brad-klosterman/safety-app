import React from 'react';
import type {
    CompositeScreenProps,
    NavigatorScreenParams,
    RouteProp,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { BottomTabNavigationOptions, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { AlarmsType } from '@state';

/**
 *   Navigation Routes Type
 *   ---
 *
 */

type RootRoutesConfig = {
    Initializing: undefined;
    PhoneLogin: undefined;
    PhoneVerification: {
        phone_number: string;
    };
    VerificationError: {
        type: 'invalid_subscription';
    };
    HomeNavbar: NavigatorScreenParams<NavbarRoutesConfig>;
    AlarmOverview: AlarmsType.AlarmsStackRow & { index: number };
    AlarmMap: {
        alarm?: AlarmsType.AlarmModel;
    };
    AlarmVideo: {
        video_url: string;
    };
    AlarmDeactivation: {
        alarm_id: number;
        source_type: AlarmsType.AlarmSource;
        continue_disabled?: boolean;
    };
    UserDetails: undefined;
    UserMedical: undefined;
    UserContacts: undefined;
    UserPassword: undefined;
    UserSettings: undefined;
    UserRegistration: undefined;
    ApplicationDetails: undefined;
    ApplicationFeedback: undefined;
    ApplicationPolicy: undefined;
};

type RootScreen = keyof RootRoutesConfig;
type RootScreenProps<TName extends RootScreen> = StackScreenProps<RootRoutesConfig, TName>;
type RootRouteProps<TName extends RootScreen> = RouteProp<RootRoutesConfig, TName>;

export type { RootRoutesConfig, RootScreen, RootScreenProps, RootRouteProps };

/** Navbar Router **/

type NavbarRoutesConfig = {
    MobilePanic: undefined;
    PropertiesManager: undefined;
    AlarmsManager: any;
    SettingsMenu: undefined;
};

type NavbarScreenName = keyof NavbarRoutesConfig;
type NavbarScreenProps<TName extends NavbarScreenName> = CompositeScreenProps<
    BottomTabScreenProps<NavbarRoutesConfig, TName>,
    RootScreenProps<RootScreen>
>;

type NavbarRouteComponentType = React.ComponentType<{
    route: RouteProp<NavbarRoutesConfig, NavbarScreenName>;
    navigation: any;
}> & { ScreenName: NavbarScreenName; Options?: BottomTabNavigationOptions };

export type { NavbarRoutesConfig, NavbarScreenName, NavbarScreenProps, NavbarRouteComponentType };

/**
 *   Navigation Context Provider Type
 *   ---
 *
 */

type NavigationProviderProps = {
    /**
     * Children React Elements to extract the route configuration from.
     * Only `Screen`, `Group` and `React.Fragment` are supported as children.
     */
    children: React.ReactNode;
};

type NavigationProviderValue = {
    root_router: string;
};

export type { NavigationProviderProps, NavigationProviderValue };
