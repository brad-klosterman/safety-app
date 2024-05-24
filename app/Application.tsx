import React from 'react';
import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import { SafeAreaProviderCompat } from '@react-navigation/elements';

import { EventManager } from '@events';
import { Authentication, Profile, SSP, Alarms } from '@state';
import Navigation, { Router, RouteGroup, Route, NavbarRoute } from '@navigation';
import {
    InitializingScreen,
    PhoneLogin,
    PhoneVerification,
    MobilePanic,
    PropertiesManager,
    AlarmsManager,
    SettingsMenu,
    UserDetails,
    UserMedical,
    UserContacts,
    UserSettings,
    ApplicationDetails,
    ApplicationFeedback,
    AlarmOverview,
    AlarmVideo,
    AlarmDeactivation,
} from '@screens';
import { useSoftwareUpdates, useMobileNetwork } from '@device';
import Theme from '@theme';
import { useHeaderOptions } from '@components/elements';

/**
 *   _____
 *
 *    SEON SAFETY APPLICATION
 *
 *
 **/

function Application() {
    useMobileNetwork();
    useSoftwareUpdates();

    return (
        <EventManager>
            <Authentication.Provider>
                <Profile.Provider>
                    <SSP.Provider>
                        <Alarms.Provider>
                            <Navigation.Provider>
                                <LoadingApplication />
                                <AuthenticationRoutes />
                                <AuthenticatedSession />
                            </Navigation.Provider>
                        </Alarms.Provider>
                    </SSP.Provider>
                </Profile.Provider>
            </Authentication.Provider>
        </EventManager>
    );
}

function AuthenticationRoutes() {
    const AuthenticationContext = Authentication.useContext();

    /**
     * Router Screen Options
     **/
    const header_options = useHeaderOptions();
    const screenOptions: StackNavigationOptions = {
        gestureEnabled: false,
        ...header_options,
        ...TransitionPresets.SlideFromRightIOS,
    };

    return AuthenticationContext.state === 'unauthenticated_device' ? (
        <Router.Root screenOptions={screenOptions}>
            <Route
                name="PhoneLogin"
                component={PhoneLogin}
                options={PhoneLogin.Options}
            />
            <Route
                name="PhoneVerification"
                component={PhoneVerification}
                options={PhoneVerification.Options}
            />
        </Router.Root>
    ) : null;
}

function AuthenticatedSession() {
    const AuthenticationContext = Authentication.useContext();
    const ThemeContext = Theme.useContext();
    const ProfileContext = Profile.useContext();

    const mobile_panics_enabled = ProfileContext.profile?.security.panics_allowed;

    /**
     * Root.Router Options
     **/
    const initialRootRoute = 'HomeNavbar';
    const header_options = useHeaderOptions();
    const screenOptions: StackNavigationOptions = {
        //gestureEnabled: false,
        ...header_options,
        ...TransitionPresets.SlideFromRightIOS,
    };
    /**
     * Navbar.Router Options
     **/
    const initialNavbarRoute = mobile_panics_enabled ? 'MobilePanic' : 'AlarmsManager';
    const settings_menu_screen_options = SettingsMenu.useOptions();

    /**
     * Render Routes if Authenticated Session
     **/
    return AuthenticationContext.state === 'authenticated_session' ? (
        <Profile.FormProvider>
            <Router.Root initialRouteName={initialRootRoute}>
                <Route
                    name="HomeNavbar"
                    options={{ headerShown: false }}
                >
                    {() => (
                        <Router.Navbar
                            initialRouteName={initialNavbarRoute}
                            screenOptions={ThemeContext.navigation.navbar.options}
                        >
                            {mobile_panics_enabled && (
                                <NavbarRoute
                                    name="MobilePanic"
                                    component={MobilePanic}
                                    options={MobilePanic.Options}
                                />
                            )}
                            <NavbarRoute
                                name="PropertiesManager"
                                component={PropertiesManager}
                                options={PropertiesManager.Options}
                            />
                            <NavbarRoute
                                name="AlarmsManager"
                                component={AlarmsManager}
                                options={AlarmsManager.Options}
                            />
                            <NavbarRoute
                                name="SettingsMenu"
                                component={SettingsMenu}
                                options={settings_menu_screen_options}
                            />
                        </Router.Navbar>
                    )}
                </Route>
                <RouteGroup screenOptions={screenOptions}>
                    <Route
                        name="AlarmOverview"
                        component={AlarmOverview}
                    />
                    <Route
                        name="AlarmVideo"
                        component={AlarmVideo}
                    />
                    <Route
                        name="AlarmDeactivation"
                        component={AlarmDeactivation}
                    />
                </RouteGroup>
                <RouteGroup screenOptions={screenOptions}>
                    <Route
                        name="UserDetails"
                        component={UserDetails}
                        options={UserDetails.Options}
                    />
                    <Route
                        name="UserMedical"
                        component={UserMedical}
                        options={UserDetails.Options}
                    />
                    <Route
                        name="UserContacts"
                        component={UserContacts}
                        options={UserContacts.Options}
                    />
                    <Route
                        name="UserSettings"
                        component={UserSettings}
                        options={UserSettings.Options}
                    />
                    <Route
                        name="ApplicationDetails"
                        component={ApplicationDetails}
                        options={ApplicationDetails.Options}
                    />
                    <Route
                        name="ApplicationFeedback"
                        component={ApplicationFeedback}
                        options={ApplicationFeedback.Options}
                    />
                </RouteGroup>
            </Router.Root>
        </Profile.FormProvider>
    ) : null;
}

function LoadingApplication() {
    const AuthenticationContext = Authentication.useContext();

    return AuthenticationContext.state === 'initializing' ? (
        <Router.Root>
            <Route
                name="Initializing"
                component={InitializingScreen}
                options={InitializingScreen.Options}
            />
        </Router.Root>
    ) : null;
}

const WithTheme = Theme.create(Application);

export default () => (
    <SafeAreaProviderCompat>
        <WithTheme />
    </SafeAreaProviderCompat>
);

/*

====================================================================================================
 ‣ Application
====================================================================================================

 import { Authentication, Profile } from '@state';
 const AuthenticationContext = Authentication.useContext();


 const ProfileContext = Profile.useContext();


 import Theme from '@theme';
 const ThemeContext = Theme.useContext();




<Route
    name="HomeNavbar"
    options={{ headerShown: false }}
>
    {() => (
        <Router.Navbar
            screens={[
                'MobilePanic',
                'PropertiesManager',
                'AlarmsManager',
                'SettingsMenu',
            ]}
        />
    )}
</Route>

     <VerificationRoutes>
                <Screen.PhoneLogin />
                <Screen.PhoneVerification />
            </VerificationRoutes>
            <AuthenticatedRoutes>
                <Screen.AlarmOverview />
                <Screen.AlarmMap />
                <Screen.AlarmVideo />
                <Screen.AlarmDeactivation />
                <Screen.UserDetails />
                <Screen.UserMedical />
                <Screen.UserPassword />
                <Screen.UserSettings />
                <Screen.UserRegistration />
                <Screen.ApplicationDetails />
                <Screen.ApplicationFeedback />
            </AuthenticatedRoutes>
tsx.TopLevel

<Route
                name="HomeNavbar"
                options={{ headerShown: false }}
            >
                {() => <Router.Navbar screens={[MobilePanic, PropertiesManager, AlarmsManager]} />}
            </Route>
*/
