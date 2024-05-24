import { ReactNode } from 'react';
import { PressableProps } from 'react-native';

import type { ThemeButtonVariantProps } from '@theme';

type ButtonBaseProps = Omit<PressableProps, 'children'> & {
    children: ReactNode;
};

type ButtonProps = ButtonBaseProps &
    ThemeButtonVariantProps & {
        //size?: keyof ThemeType.ThemeModel['spacing'];
        fit_width?: boolean;
        //flex?: boolean;
    };

export type { ButtonBaseProps, ButtonProps };
