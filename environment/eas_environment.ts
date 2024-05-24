// eslint-disable-next-line import/no-named-as-default
import Constants from 'expo-constants';

import type { EasEnvironmentVariables } from './types';

export const eas_environment = Constants.expoConfig?.extra as EasEnvironmentVariables;
