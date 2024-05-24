import { memo, useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
import RNPhoneInput from 'react-native-phone-input';

import { styled } from '@theme';
import { Text } from '@components/ui/Text/Text';
import { Flex } from '@components/ui/Box';

const InputPhone = memo(
    ({
        initial_phone_number,
        setValidPhone,
    }: {
        initial_phone_number?: string | null | undefined;
        setValidPhone(valid: boolean, phone_number: string | undefined): void;
    }) => {
        const phone_ref = useRef<RNPhoneInput<typeof TextInput> | null>();

        const styles = useStyles();

        useEffect(() => {
            if (initial_phone_number) {
                phone_ref.current?.setValue(initial_phone_number);
            }
        }, []);

        const onChangePhoneNumber = (value: string) => {
            if (value.length > 8 && phone_ref.current) {
                setValidPhone(phone_ref.current.isValidNumber(), value);
            } else {
                setValidPhone(false, undefined);
            }
        };

        return (
            <Flex style={styles.container}>
                <Text style={styles.label}>Mobile Phone Number</Text>
                <RNPhoneInput
                    ref={(ref) => {
                        phone_ref.current = ref;
                    }}
                    textStyle={styles.value_text}
                    initialCountry={'za'}
                    initialValue="27"
                    onChangePhoneNumber={onChangePhoneNumber}
                    flagStyle={{ width: 28, height: 17, borderWidth: 0 }}
                    autoFormat
                    // autoCompleteType="tel"
                    // returnKeyType="next"
                />
            </Flex>
        );
    }
);

const useStyles = styled((theme) => ({
    container: {
        height: 38,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    label: {
        fontSize: 12,
        lineHeight: 16,
        color: theme.colors.text_label,
    },
    value_text: {
        color: theme.colors.text_primary,
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.408,
    },
}));

export { InputPhone };
