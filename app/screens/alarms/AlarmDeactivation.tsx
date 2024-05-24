import React from 'react';
import { Linking } from 'react-native';

import { Authentication, type AuthenticationType } from '@state';
import { type RootScreenProps } from '@navigation';
import { Box, Flex, Form, Text, PressableOpacity } from '@components/ui';
import { ScreenView, Header, ActionSheet } from '@components/elements';

/**
 *   Alarm Deactivation Screen
 *   ---
 *
 **/

function AlarmDeactivation(props: RootScreenProps<'AlarmDeactivation'>) {
    const navigate = props.navigation.navigate;

    const AuthenticationContext = Authentication.useContext();

    const [phone_number, setPhoneNumber] = React.useState('27');
    const [valid_phone_number, setValidPhoneNumber] = React.useState(false);

    /**
     * Event Handlers
     **/

    /**
     * Action Handlers
     **/
    function pressContinue() {
        //AuthenticationContext.action.requestOTP(phone_number).then(handleContinueNavigation);
    }

    async function pressOpenTerms() {
        // const supported = await Linking.canOpenURL(TERMS_URL);
        // if (supported) await Linking.openURL(TERMS_URL);
    }

    async function handlePhoneChange() {
        // const supported = await Linking.canOpenURL(TERMS_URL);
        // if (supported) await Linking.openURL(TERMS_URL);
    }

    return (
        <ScreenView
            headerRight={() => (
                <Header.Right
                    title="Continue"
                    disabled={!valid_phone_number}
                    onPress={pressContinue}
                />
            )}
            headline="Please enter your phone number."
        >
            <Box
                flex={1}
                width="100%"
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
            </Box>
            <Flex
                direction="column"
                alignItems="center"
                gap="xs"
                paddingBottom="xl"
                width={'100%'}
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

AlarmDeactivation.Options = {
    title: 'Welcome',
};

export { AlarmDeactivation };
