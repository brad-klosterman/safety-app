import React from 'react';
import { createTheme as createRestyleTheme } from '@shopify/restyle';
import { BUTTON_VARIANTS } from '@components/ui/Button/variants';
import { TEXT_VARIANTS } from '@components/ui/Text/variants';
import { THEME_SPACING } from './spacing';
import { COLOR_THEME_LIGHT_VARIANT } from './colors/light';
import ThemeProvider from './ThemeProvider';
import { inputVariants } from '@theme/type.Theme';

/**
 *   Create Theme
 *   ---
 *
 *
 */

function createTheme(Application: React.ComponentType<any>) {
    return () => {
        const base_theme = createRestyleTheme({
            colors: COLOR_THEME_LIGHT_VARIANT,
            spacing: THEME_SPACING,
            borderRadii: {
                none: 0,
                s: 4,
                m: 8,
                l: 12,
                xl: 16,
                xxl: 35,
                full: 999,
            },
            buttonVariants: BUTTON_VARIANTS,
            textVariants: TEXT_VARIANTS,
            inputVariants: inputVariants,
        });
        return (
            <React.Suspense fallback={<></>}>
                <ThemeProvider base_theme={base_theme}>
                    <Application />
                </ThemeProvider>
            </React.Suspense>
        );
    };
}

export { createTheme };

/*

====================================================================================================
 ‣ Create Application Theme
====================================================================================================




*/
