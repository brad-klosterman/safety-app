import { useAtomValue } from 'jotai';
import { useColorScheme } from 'react-native';

import { THEME_VARIANT_PREFERENCE_ATOM } from './useThemeStorage';
import type { ThemeVariant } from './type.Theme';

const useThemeVariant = (): ThemeVariant => {
    const device_color_scheme = useColorScheme();
    const variant_preference = useAtomValue(THEME_VARIANT_PREFERENCE_ATOM);

    if (variant_preference === 'auto' && device_color_scheme) {
        return device_color_scheme;
    }
    if (variant_preference !== 'auto') {
        return variant_preference;
    }

    return 'light';
};

export { useThemeVariant };
