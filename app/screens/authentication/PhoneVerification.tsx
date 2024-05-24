import React from 'react';

import { Authentication } from '@state';
import { RootScreenProps } from '@navigation';
import { Flex, Form, Text, PressableOpacity } from '@components/ui';
import { ScreenView, Header } from '@components/elements';

/**
 *  Phone Verification Screen (OTP)
 *   ---
 *
 */

function PhoneVerification(props: RootScreenProps<'PhoneVerification'>) {
    const navigate = props.navigation.navigate;
    const AuthenticationContext = Authentication.useContext();

    /**
     * Screen State
     *
     **/

    const [code, setCode] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const continue_disabled = code.length !== 6;

    /**
     * Event Handlers
     *
     **/

    const handleCodeChange = React.useCallback((v: string) => {
        setError(false);
        setCode(v);
    }, []);

    /**
     * Action Handlers
     *
     **/

    async function pressContinue() {
        AuthenticationContext.action.verifyOTP(code).then((response) => {
            // if ('success' in res) {
            //     console.log('success');
            // } else {
            //     console.log(' no success');
            // }
        });
        //navigate('PhoneVerification', { phone_number });
    }

    function pressRetry() {
        navigate('PhoneLogin');
    }

    const renderRetryButton = () => {
        if (error) {
            return (
                <Flex
                    flex={1}
                    alignItems="flex-end"
                    justifyContent="center"
                    gap="xs"
                    paddingBottom="xl"
                >
                    <PressableOpacity
                        onPress={pressRetry}
                        disabled={!error}
                    >
                        <Text
                            variant="button_ghost"
                            color="text_emphasis"
                            textAlign="center"
                        >
                            Retry Verification
                        </Text>
                    </PressableOpacity>
                </Flex>
            );
        }
        return null;
    };

    return (
        <ScreenView
            headerRight={() => (
                <Header.Right
                    title="Verify"
                    renderIcon="continue"
                    disabled={continue_disabled || loading}
                    onPress={pressContinue}
                />
            )}
            headline={`A text message with a 6-digit verification code will be sent to ${props.route.params.phone_number}`}
        >
            <Text
                variant="footnote"
                color="text_secondary"
            >
                Please be patient, it can sometimes take a while to receive the message.
            </Text>
            <Flex justifyContent="center">
                <Form.InputCode
                    code={code}
                    onCodeChanged={handleCodeChange}
                />
                {error && (
                    <Text
                        variant="body"
                        textAlign="center"
                        color="danger"
                    >
                        The sms verification code is invalid. Please be sure use the verification
                        code you have provided is correct.
                    </Text>
                )}
            </Flex>
            {renderRetryButton()}
        </ScreenView>
    );
}

PhoneVerification.Options = {
    title: 'Verify OTP',
};

export { PhoneVerification };
