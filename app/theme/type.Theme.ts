import { BUTTON_VARIANTS } from '@components/ui/Button/variants';
import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Theme as ReactNavigationTheme } from '@react-navigation/native/lib/typescript/src/types';
import { type VariantProps } from '@shopify/restyle';
import { THEME_SPACING } from './spacing';

/**
 *   Theme Model
 *   ---
 *
 */

type ThemeModel = {
    //variant: ThemeVariant;
    colors: Record<ThemeColor, string>;
    spacing: typeof THEME_SPACING;
    borderRadii: Record<ThemeBorderRadii, number>;
    buttonVariants: typeof BUTTON_VARIANTS;
    textVariants: Record<
        ThemeTextVariant,
        {
            fontFamily: string;
            fontWeight: string;
            fontSize: number;
            lineHeight: number;
            letterSpacing: number;
            paddingVertical?: ThemeSpace;
            color?: ThemeColor;
            textDecorationLine?: 'underline';
        }
    >;
    inputVariants: InputVariants;
};

type ThemeVariant = 'light' | 'dark';

type ThemeColor =
    | 'emphasis'
    | 'success'
    | 'danger'
    | 'warning'
    | 'background_primary'
    | 'background_secondary'
    | 'background_tertiary'
    | 'background_contrast'
    | 'background_elevated_primary'
    | 'background_elevated_secondary'
    | 'background_elevated_tertiary'
    | 'text_primary'
    | 'text_secondary'
    | 'text_tertiary'
    | 'text_quarternary'
    | 'text_label'
    | 'text_contrast'
    | 'text_emphasis'
    | 'text_danger'
    | 'text_disabled'
    | 'label_color_primary'
    | 'pill_success'
    | 'pill_success_background'
    | 'pill_danger'
    | 'pill_danger_background'
    | 'pill_warning_background'
    | 'pill_warning'
    | 'line'
    | 'line_disabled'
    | 'disabled'
    | 'menu_border'
    | 'card'
    | 'modal'
    | 'transparent'
    | 'white';

type ThemeSpace = Extract<keyof typeof THEME_SPACING, string>;

type ThemeBorderRadii = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'full';

type ThemeButtonVariant =
    | 'defaults'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'danger_secondary'
    | 'ghost_primary'
    | 'ghost_danger';

type ThemeButtonVariantProps = VariantProps<ThemeModel, 'buttonVariants'>;

type ThemeTextVariant =
    | 'defaults'
    | 'headline_1_bold'
    | 'headline_1'
    | 'large_title_bold'
    | 'large_title'
    | 'title_1_bold'
    | 'title_1'
    | 'title_2_bold'
    | 'title_2'
    | 'title_3_bold'
    | 'title_3'
    | 'headline_bold'
    | 'headline'
    | 'body_20_bold'
    | 'body_20'
    | 'body_bold'
    | 'body'
    | 'callout_bold'
    | 'callout'
    | 'subheadline_bold'
    | 'subheadline'
    | 'footnote_bold'
    | 'footnote'
    | 'caption_1_bold'
    | 'caption_1'
    | 'caption_2_bold'
    | 'caption_2'
    | 'caption_3_bold'
    | 'caption_3'
    | 'button'
    | 'button_ghost'
    | 'header_button'
    | 'link'
    | 'label';

export type {
    ThemeModel,
    ThemeVariant,
    ThemeColor,
    ThemeSpace,
    ThemeBorderRadii,
    ThemeButtonVariant,
    ThemeButtonVariantProps,
    InputVariants,
    ThemeTextVariant,
};

export const inputVariants = {
    defaults: {
        width: '100%',
        color: 'text_primary',
        fontFamily: 'Inter_400Regular',
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 22,
        height: 22,
        letterSpacing: -0.408,
    },
} as const;

type InputVariants = typeof inputVariants;

/**
 *   Theme Provider Types
 *   ---
 *
 */

type NavigationTheme = {
    navbar: { height: number; options: BottomTabNavigationOptions };
    container: ReactNavigationTheme;
};

type ThemeProviderProps = {
    base_theme: ThemeModel;
    children: React.ReactNode;
};

type ThemeProviderValue = {
    theme: ThemeModel;
    variant: ThemeVariant;
    navigation: NavigationTheme;
};

export type { NavigationTheme, ThemeProviderProps, ThemeProviderValue };

/**
 * SSP Theme Branding
 **/

type ThemeBranding = {
    colors: ThemeBrandingColor;
};

type ThemeBrandingColor = 'emphasis' | 'success' | 'text_emphasis';

type ThemeBrandingSetting = {
    colors: {
        light: Record<ThemeBrandingColor, string>;
        dark: Record<ThemeBrandingColor, string>;
    };
};

export type { ThemeBranding, ThemeBrandingColor, ThemeBrandingSetting };

/**
 * User Theme Preference
 **/

type ThemeVariantPreference = ThemeVariant | 'auto';

export type { ThemeVariantPreference };
