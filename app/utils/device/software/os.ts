import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const PlatformVersion = Platform.Version;

export { isIOS, isAndroid, PlatformVersion };
