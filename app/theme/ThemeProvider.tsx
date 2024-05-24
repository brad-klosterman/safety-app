import React, { useState } from 'react';
import { ThemeProvider as RSThemeProvider } from '@shopify/restyle';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { createContextProvider } from '@utils';
import { useAndroidTheme } from '@theme/useAndroidTheme';
import { useThemeColors } from '@theme/useThemeColors';
import { useThemeVariant } from '@theme/useThemeVariant';
import { useNavigationTheme } from './useNavigationTheme';
import { useFonts } from './useFonts';
import type { ThemeModel, ThemeProviderProps, ThemeProviderValue } from './type.Theme';

/**
 *   Theme Context Provider
 *   ---
 *
 **/

const [ThemeContext, useThemeContext] = createContextProvider<ThemeProviderValue>();

function ThemeProvider(props: ThemeProviderProps) {
    const base_theme = props.base_theme;

    const variant = useThemeVariant();
    const colors = useThemeColors(variant);

    const [theme, setTheme] = useState<ThemeModel>({ ...base_theme, colors });

    React.useEffect(() => {
        setTheme((prev) => ({
            ...prev,
            colors,
        }));
    }, [colors]);

    const navigation_theme = useNavigationTheme({ theme });

    useAndroidTheme({ variant, colors });

    /** Load fonts */ /** Hide splash screen */
    const fonts = useFonts({
        async onLoadComplete() {
            await SplashScreen.hideAsync();
        },
    });

    if (!fonts.loaded) return null;

    return (
        <RSThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ theme, variant, navigation: navigation_theme }}>
                <StatusBar style={variant} />
                {props.children}
            </ThemeContext.Provider>
        </RSThemeProvider>
    );
}

export { useThemeContext };
export default React.memo(ThemeProvider);

// Keep the splash screen visible while loading resources
SplashScreen.preventAutoHideAsync();

/*

====================================================================================================
 Theme Provider
====================================================================================================

store ssp branding
store user variant
reset on logout

*/
