import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemeColor } from '@theme';

type HeaderButtonProps = {
    /**
     * Callback to call when the button is pressed.
     */
    onPress?: () => void;
    /**
     * Whether the button is disabled.
     */
    disabled?: boolean;
    /**
     * Accessibility label for the button for screen readers.
     */
    accessibilityLabel?: string;
    /**
     * Tint color for the header button.
     */
    tintColor?: string;
    /**
     * Color for material ripple (Android >= 5.0 only).
     */
    pressColor?: string;
    /**
     * Opacity when the button is pressed, used when ripple is not supported.
     */
    pressOpacity?: number;
    /**
     * Style object for the button.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Content to render for the button. Usually the icon.
     */
    children: React.ReactNode;
};

type HeaderButtonConfig = {
    title?: string;
    onPress?: () => void;
    disabled?: boolean;
    hide_icon?: boolean;
    color?: ThemeColor;
};

export type { HeaderButtonProps, HeaderButtonConfig };
