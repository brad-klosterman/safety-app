import { Dimensions, StyleSheet } from 'react-native';
import { type BoxProps } from '@components/ui/Box';

export const SELECTOR_ITEM_HEIGHT = 32;
export const SELECTOR_VISIBLE_ITEMS = 5;
export const SELECTOR_MODAL_WIDTH = Dimensions.get('screen').width - 64;

export const SELECTOR_MIN_SCALE = 1;
export const SELECTOR_MAX_SCALE = 1.2;
export const SELECTOR_MAX_ROTATION = 40;
export const SELECTOR_MIN_OPACITY = 0.6;

export const SELECTOR_PERSPECTIVE = 600;

export const SELECTOR_VIEWABILITY_CONFIG = {
    itemVisiblePercentThreshold: 95,
    minimumViewTime: 200,
};

/**
 * Selector Modal
 */

export const DEFAULT_SELECTOR_MODAL_PROPS: BoxProps = {
    backgroundColor: 'background_primary',
    borderRadius: 'l',
    gap: 'm',
};

export const DEFAULT_SELECTOR_HIGHLIGHT_PROPS: BoxProps = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'background_tertiary',
    borderRadius: 's',
};
