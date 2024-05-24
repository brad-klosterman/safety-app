import { useRef } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { type FieldValues, useController } from 'react-hook-form';

import { AnimatedText } from '@components/ui/Text/Text';
import type { ControlledInputProps } from './types';
import { useInputAnimation } from './animation';
import { InputBase } from './input.base';

/**
 * Form.Input
 * ---
 *
 * https://www.react-hook-form.com/api/usecontroller/
 */

function ControlledInput<T extends FieldValues>({
    name,
    label,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    ...input_props
}: ControlledInputProps<T>) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
        defaultValue,
        shouldUnregister,
    });

    const input_ref = useRef<TextInput | null>();

    const animated = useInputAnimation({ value });

    const onChangeText = (text_value: string) => {
        // @ts-ignore
        onChange(text_value);
    };

    const onFocusHandler = () => {
        animated.onFocus();
        input_ref?.current && input_ref.current.focus();
    };

    const onBlurHandler = () => {
        onBlur();
        animated.onBlur();
    };

    return (
        <Pressable
            style={styles.container}
            onPress={onFocusHandler}
        >
            <AnimatedText
                color={error ? 'text_danger' : 'text_label'}
                style={animated.styles}
            >
                {label}
            </AnimatedText>
            <InputBase
                {...input_props}
                ref={(e: TextInput) => {
                    ref(e);
                    input_ref.current = e;
                }}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                // TODO: listen to contrast mode
                keyboardAppearance="dark"
                underlineColorAndroid="transparent"
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export { ControlledInput };
