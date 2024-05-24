import React from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { ColorValue, Platform } from 'react-native';

import type { ThemeVariant, ThemeColor } from './type.Theme';

const useAndroidTheme = (props: { variant: ThemeVariant; colors: Record<ThemeColor, string> }) => {
    async function configureNavigationBar(params: {
        background_color: ColorValue;
        theme_variant: ThemeVariant;
    }) {
        await NavigationBar.setBackgroundColorAsync(params.background_color);
        await NavigationBar.setButtonStyleAsync(params.theme_variant);
    }

    React.useEffect(() => {
        if (Platform.OS === 'android')
            (async () => {
                await configureNavigationBar({
                    background_color: props.colors.background_elevated_primary,
                    theme_variant: props.variant,
                });
            })();
    }, [props.variant, props.colors]);
};

export { useAndroidTheme };
