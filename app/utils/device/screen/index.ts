import { Dimensions as ScreenDimensions } from 'react-native';

export type Dimensions = { width: number; height: number };

export const SCREEN_WIDTH = ScreenDimensions.get('window').width;
export const SCREEN_HEIGHT = ScreenDimensions.get('window').height;
