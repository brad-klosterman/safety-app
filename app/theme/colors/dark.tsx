import type { ThemeColor } from '../type.Theme';

const palette = {
    system_red: '#FF453A',
    system_green: '#3AC13D',
    system_yellow: '#FFD60A',
    system_gray_01: '#FAFAFA',
    system_gray_02: '#EBEBF5',
    system_gray_03: '#82888C',
    system_gray_04: '#90979F',
    system_gray_05: '#AEAEB2',
    system_gray_06: '#7C7C80',
    system_gray_07: '#545456',
    system_gray_08: '#444446',
    system_gray_09: '#363638',
    system_gray_10: '#000000',
    system_black: '#000000',
    system_ice: '#FFFFFF',
};

const default_primary = palette.system_green;

const systems_background_elevated = {
    primary: '#1A1A1A',
    secondary: '#2C2C2E',
    tertiary: '#3A3A3C',
};

const systems_label = {
    primary: '#FAFAFA',
    secondary: 'rgba(235, 235, 245, 0.6)',
    tertiary: 'rgba(235, 235, 245, 0.3)',
    quarternary: 'rgba(60, 60, 67, 0.18)',
};

export const COLOR_THEME_DARK_VARIANT: Record<ThemeColor, string> = {
    emphasis: default_primary,
    success: default_primary,
    danger: palette.system_red,
    warning: palette.system_yellow,
    background_primary: palette.system_gray_10,
    background_secondary: palette.system_gray_09,
    background_tertiary: palette.system_gray_08,
    background_contrast: palette.system_gray_01,
    background_elevated_primary: systems_background_elevated.primary,
    background_elevated_secondary: systems_background_elevated.secondary,
    background_elevated_tertiary: systems_background_elevated.tertiary,
    text_primary: systems_label.primary,
    text_secondary: systems_label.secondary,
    text_tertiary: systems_label.tertiary,
    text_quarternary: systems_label.quarternary,
    text_label: palette.system_gray_05,
    text_contrast: palette.system_gray_10,
    text_emphasis: default_primary,
    text_danger: palette.system_red,
    text_disabled: '#C8C8C8',
    label_color_primary: '#000',
    pill_success: systems_label.tertiary,
    pill_success_background: systems_background_elevated.primary,
    pill_danger: 'rgba(186, 51, 58, 1)',
    pill_danger_background: 'rgba(54, 23, 25, 1)',
    pill_warning: '#f0c000',
    pill_warning_background: '#2c2100',
    line: palette.system_gray_05,
    line_disabled: '#C8C8C8',
    disabled: palette.system_gray_02,
    menu_border: '#404044',
    card: systems_background_elevated.primary,
    modal: systems_background_elevated.primary,
    transparent: 'transparent',
    white: '#FFFFFF',
};
