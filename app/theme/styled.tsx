import { useMemo } from 'react';
import { useTheme, RNStyle } from '@shopify/restyle';
import { ThemeModel } from '@theme/type.Theme';

type NamedStyles<T> = { [P in keyof T]: RNStyle };

const styled =
    <T extends NamedStyles<T>>(styles: (theme: ThemeModel) => T) =>
    () => {
        const theme = useTheme<ThemeModel>();
        return useMemo(() => ({ ...styles(theme) }), [theme]);
    };

export { styled };
