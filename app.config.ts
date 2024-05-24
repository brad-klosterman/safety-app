import { ConfigContext, ExpoConfig } from '@expo/config';

import { EasEnvironmentVariables } from './environment/types';

const PACKAGE_NAME = 'com.seon.group.seonsafety';
const ANDROID_ICON = './assets/android_icon.png';
const IOS_ICON = './assets/ios_icon.png';

export default ({ config }: ConfigContext): ExpoConfig => {
    let env_variables: EasEnvironmentVariables;

    const BUILD_PROFILE = process.env.EAS_BUILD_PROFILE || 'development';

    if (BUILD_PROFILE === 'production' || BUILD_PROFILE === 'staging') {
        env_variables = {
            BUILD_PROFILE,
            SEON_API_URL: 'https://api.seon.network/api/v3/mobile',
        };
    } else {
        env_variables = {
            BUILD_PROFILE,
            SEON_API_URL: 'https://api.staging.seon.network/api/v3/mobile',
        };
    }

    return {
        ...config,
        name: 'The Safety App',
        owner: 'seon-group',
        slug: 'seon-safety',
        version: '3.0.0',
        runtimeVersion: {
            policy: 'appVersion',
        },
        jsEngine: 'hermes',
        platforms: ['ios', 'android'],
        orientation: 'portrait',
        icon: IOS_ICON,
        userInterfaceStyle: 'automatic',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#000000',
        },
        updates: {
            enabled: true,
            fallbackToCacheTimeout: 0,
            url: 'https://u.expo.dev/a719af1d-e429-46d4-935f-02991458896f',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            bundleIdentifier: PACKAGE_NAME,
            buildNumber: '10',
            supportsTablet: true,
            infoPlist: {
                UIBackgroundModes: ['remote-notification', 'fetch'],
                NSLocationAlwaysUsageDescription:
                    'This app tracks your location to provide emergency response to your current location',
                NSCameraUsageDescription:
                    'This app uses the camera in order for you to provide our responders with verification images',
                NSFaceIDUsageDescription:
                    'Use your phones saved biometrics to either reset or view your current security password',
            },
            splash: {
                backgroundColor: '#000000',
            },
            googleServicesFile: './GoogleService-Info.plist',
            config: {
                googleMapsApiKey: 'AIzaSyDeGijp2n3sy86kIhg7ZMO6Ze0Vemwskvc',
            },
        },
        androidNavigationBar: {
            //barStyle: 'dark-content',
            backgroundColor: '#000',
        },
        android: {
            package: PACKAGE_NAME,
            versionCode: 10,
            adaptiveIcon: {
                foregroundImage: ANDROID_ICON,
                backgroundColor: '#000000',
            },
            softwareKeyboardLayoutMode: 'pan',
            config: {
                googleMaps: {
                    apiKey: 'AIzaSyBrTVITfvr70HIvK5rmJ7mDrthhsYLZaZ4',
                },
            },
            googleServicesFile: './google-services.json',
            permissions: ['ACCESS_FINE_LOCATION', 'FOREGROUND_SERVICE'],
        },
        plugins: [
            './plugins/rn-maps.js',
            [
                'expo-updates',
                {
                    username: 'seon-group',
                },
            ],
            '@react-native-firebase/app',
            '@react-native-firebase/auth',
            [
                'expo-build-properties',
                {
                    ios: {
                        useFrameworks: 'static',
                    },
                },
            ],
            [
                'expo-camera',
                {
                    cameraPermission:
                        'Allow camera usage for taking a profile photo of you to be better identified by the emergency responder in case of an emergency.',
                },
            ],
            [
                'expo-image-picker',
                {
                    photosPermission: 'Allow The Safety App to select a photo',
                },
            ],
            [
                'expo-location',
                {
                    locationWhenInUsePermission:
                        'Your current location will be used to dispatch responders and will only be used in case of an emergency.',
                },
            ],
            [
                'expo-local-authentication',
                {
                    faceIDPermission: 'Allow The Safety App to use Face ID.',
                },
            ],
        ],
        extra: {
            ...env_variables,
            eas: {
                projectId: 'a719af1d-e429-46d4-935f-02991458896f',
            },
        },
    };
};
