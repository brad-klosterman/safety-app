import { createRestyleComponent, createVariant } from '@shopify/restyle';
import { TextInput } from 'react-native';

import { type ThemeModel } from '@theme';
import { type InputProps } from './types';

const variant = createVariant<ThemeModel>({
    themeKey: 'inputVariants',
});

export const InputBase = createRestyleComponent<InputProps, ThemeModel>([variant], TextInput);
