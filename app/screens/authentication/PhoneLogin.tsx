import React from 'react';
import { Linking } from 'react-native';

import { Authentication, type AuthenticationType } from '@state';
import { type RootScreenProps } from '@navigation';
import { Box, Flex, Form, Text, PressableOpacity } from '@components/ui';
import { ScreenView, Header, ActionSheet } from '@components/elements';

const TERMS_URL = 'https://www.seon.group/privacy-policy-and-safety-app';

/**
 *   Phone Login
 *   ---
 *
 *
 *
 */

function PhoneLogin(props: RootScreenProps<'PhoneLogin'>) {
    const navigate = props.navigation.navigate;

    const AuthenticationContext = Authentication.useContext();

    const [phone_number, setPhoneNumber] = React.useState('27');
    const [valid_phone_number, setValidPhoneNumber] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    /**
     * Event Handlers
     **/

    const handlePhoneChange = React.useCallback((valid: boolean, phone_input: string) => {
        setValidPhoneNumber(valid);
        setPhoneNumber(phone_input);
    }, []);

    async function handleContinueNavigation(
        params: AuthenticationType.AuthenticationActionResponse
    ) {
        if ('success' in params) {
            navigate('PhoneVerification', { phone_number });
        } else {
            //await navigate('VerificationError', { error_message: params.error });
        }
    }

    /**
     * Action Handlers
     **/
    function pressContinue() {
        setLoading(true);
        AuthenticationContext.action.requestOTP(phone_number).then(async (response) => {
            await handleContinueNavigation(response);
            setLoading(false);
        });
    }

    async function pressOpenTerms() {
        const supported = await Linking.canOpenURL(TERMS_URL);
        if (supported) await Linking.openURL(TERMS_URL);
    }

    return (
        <ScreenView
            headerRight={() => (
                <Header.Right
                    title="Continue"
                    renderIcon="continue"
                    disabled={!valid_phone_number || loading}
                    onPress={pressContinue}
                />
            )}
            headline="Please enter your phone number."
        >
            <ActionSheet>
                <ActionSheet.Item
                    position="single"
                    type="input"
                >
                    <Form.InputPhone
                        initial_phone_number={phone_number}
                        setValidPhone={handlePhoneChange}
                    />
                </ActionSheet.Item>
            </ActionSheet>

            <Flex
                flex={1}
                direction="column"
                alignItems="center"
                justifyContent="flex-end"
                gap="xs"
                paddingBottom="xl"
            >
                <Text>By continuing you agree to</Text>
                <PressableOpacity
                    onPress={pressOpenTerms}
                    hitSlop={50}
                >
                    <Text variant="link">SEON Terms and Conditions.</Text>
                </PressableOpacity>
            </Flex>
        </ScreenView>
    );
}

PhoneLogin.Options = {
    title: 'Welcome',
};

export { PhoneLogin };

/*

React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, [navigation]);
 */
