import { useAtomValue } from 'jotai';
import { COLOR_THEME_LIGHT_VARIANT } from './colors/light';
import { COLOR_THEME_DARK_VARIANT } from './colors/dark';
import { THEME_BRANDING_SETTING_ATOM } from './useThemeStorage';
import type { ThemeVariant, ThemeColor } from './type.Theme';

const useThemeColors = (theme_variant: ThemeVariant): Record<ThemeColor, string> => {
    const theme_branding_setting = useAtomValue(THEME_BRANDING_SETTING_ATOM);

    const base_colors = {
        light: COLOR_THEME_LIGHT_VARIANT,
        dark: COLOR_THEME_DARK_VARIANT,
    }[theme_variant];

    if (theme_branding_setting?.colors) {
        return {
            ...base_colors,
            ...theme_branding_setting.colors[theme_variant],
        };
    }

    return base_colors;
};

export { useThemeColors };
