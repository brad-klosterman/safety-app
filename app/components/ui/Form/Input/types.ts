import { ThemeModel } from '@theme';
import { Control, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { VariantProps } from '@shopify/restyle';

export type InputProps = TextInputProps & VariantProps<ThemeModel, 'inputVariants'>;

type ControlledInputProps<T extends FieldValues> = TextInputProps &
    UseControllerProps<T> & {
        control: Control<T>;
        label?: string;
    };

export type { ControlledInputProps };
