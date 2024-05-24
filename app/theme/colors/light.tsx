import type { ThemeColor } from '../type.Theme';

const palette = {
    system_red: '#FF3B30',
    system_green: '#3AC13D',
    system_yellow: '#FFCC00',
    system_gray_01: '#42464D',
    system_gray_02: '#60656C',
    system_gray_03: '#82888C',
    system_gray_04: '#90979F',
    system_gray_05: '#B1B9BF',
    system_gray_06: '#C2CAD1',
    system_gray_07: '#D4DCE4',
    system_gray_08: '#DAE2EA',
    system_gray_09: '#E6EBF1',
    system_gray_10: '#F2F5F9',
    system_black: '#000000',
    system_ice: '#FFFFFF',
};

const systems_background_elevated = {
    primary: '#FFFFFF',
    secondary: '#2C2C2E',
    tertiary: '#3A3A3C',
};

const systems_label = {
    primary: '#171717',
    secondary: '#737373',
    tertiary: '#BBBEC2',
    quarternary: '#D1D4D7',
};

const default_primary = palette.system_green;

const COLOR_THEME_LIGHT_VARIANT: Record<ThemeColor, string> = {
    emphasis: default_primary,
    success: default_primary,
    danger: palette.system_red,
    warning: palette.system_yellow,
    background_primary: palette.system_gray_10,
    background_secondary: palette.system_gray_09,
    background_tertiary: palette.system_gray_08,
    background_contrast: palette.system_gray_01,
    background_elevated_primary: systems_background_elevated.primary,
    background_elevated_secondary: palette.system_gray_10,
    background_elevated_tertiary: palette.system_ice,
    text_primary: systems_label.primary,
    text_secondary: systems_label.secondary,
    text_tertiary: systems_label.tertiary,
    text_quarternary: systems_label.quarternary,
    text_label: palette.system_gray_05,
    text_contrast: palette.system_gray_10,
    text_emphasis: default_primary,
    text_danger: palette.system_red,
    text_disabled: '#C8C8C8',
    label_color_primary: '#FFFFFF',
    pill_success: systems_label.tertiary,
    pill_success_background: '#E6EBF1',
    pill_danger: '#cd2b31',
    pill_danger_background: '#f3aeaf',
    pill_warning: '#946800',
    pill_warning_background: '#efd36c',
    line: palette.system_gray_05,
    line_disabled: '#C8C8C8',
    disabled: palette.system_gray_02,
    menu_border: '#D4DCE4',
    card: systems_background_elevated.primary,
    modal: systems_background_elevated.primary,
    transparent: 'transparent',
    white: '#FFFFFF',
};

export { COLOR_THEME_LIGHT_VARIANT };
