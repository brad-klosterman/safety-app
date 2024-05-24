import React from 'react';
import { Linking } from 'react-native';

import type { RootScreenProps } from '@navigation/type.Navigation';

import { ScreenView } from '@components/elements';
import { Stack, Button, Text } from '@components/ui';

/**
 *   Application Feedback
 *   -----
 *
 **/

const FORM_URL = 'https://forms.monday.com/forms/a63b19ecc3b9727d3d2d43111be31411?r=use1';

function ApplicationFeedback(props: RootScreenProps<'ApplicationFeedback'>) {
    const pressOpenForm = async () => {
        const supported = await Linking.canOpenURL(FORM_URL);
        if (supported) {
            await Linking.openURL(FORM_URL);
        }
    };

    return (
        <ScreenView
            paddingVertical="m"
            gap="m"
        >
            <Stack gap="s">
                <Text variant="body">Help us get better by providing us with feedback</Text>
                <Text variant="body">
                    Note: The feedback form is currently only available in English.
                </Text>
            </Stack>
            <Button onPress={pressOpenForm}>Go to feedback form</Button>
        </ScreenView>
    );
}

ApplicationFeedback.Options = { title: 'Application Feedback' };

export { ApplicationFeedback };
