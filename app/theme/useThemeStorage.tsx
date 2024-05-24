import { asyncAtomStorage } from '@device';

import type { ThemeVariantPreference, ThemeBrandingSetting } from './type.Theme';

export const THEME_VARIANT_PREFERENCE_ATOM = asyncAtomStorage<ThemeVariantPreference>(
    'theme_variant_preference',
    'auto'
);

export const THEME_BRANDING_SETTING_ATOM = asyncAtomStorage<ThemeBrandingSetting | null>(
    'theme_branding_setting',
    null
);
