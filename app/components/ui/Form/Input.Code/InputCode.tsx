import { memo } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { styled } from '@theme';

const InputCode = memo(
    ({
        error,
        ...props
    }: {
        code: string;
        onCodeChanged: (code: string) => void;
        error?: boolean;
    }) => {
        const styles = useStyles();

        return (
            <OTPInputView
                pinCount={6}
                autoFocusOnLoad
                keyboardAppearance={'light'}
                style={styles.otp_container}
                codeInputFieldStyle={{
                    ...styles.input,
                    ...styles[error ? 'input_border_error' : 'input_border'],
                }}
                codeInputHighlightStyle={styles.highlight}
                {...props}
            />
        );
    }
);

const useStyles = styled((theme) => ({
    otp_container: { width: 300, height: 60, alignSelf: 'center' },
    input: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderRadius: theme.borderRadii.m,
        color: theme.colors.line,
    },
    input_border: {
        borderColor: theme.colors.line,
    },
    input_border_error: {
        borderColor: theme.colors.danger,
    },
    highlight: {
        borderColor: theme.colors.emphasis,
    },
}));

export { InputCode };
