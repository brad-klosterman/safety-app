import React from 'react';
import { Linking } from 'react-native';
import * as Device from 'expo-device';
import * as Updates from 'expo-updates';

import type { RootScreenProps } from '@navigation/type.Navigation';
import { Profile } from '@state';
import { formatDateTime } from '@utils';
import { useExpoUpdate } from '@device';
import Theme from '@theme';
import { ScreenView } from '@components/elements';
import { Stack, Row, Button, PressableOpacity, Text, Flex } from '@components/ui';

/**
 *   Application Details Screen
 *   -----
 *
 **/

function ApplicationDetails(props: RootScreenProps<'ApplicationDetails'>) {
    const ProfileContext = Profile.useContext();
    const { profile } = ProfileContext;
    const terms_and_conditions_url = profile?.ssp?.terms_and_conditions;

    const { updateAvailable, downloadingUpdate, downloadUpdate } = useExpoUpdate();

    const pressOpenTerms = React.useCallback(async () => {
        if (terms_and_conditions_url) {
            const supported = await Linking.canOpenURL(terms_and_conditions_url);
            if (supported) {
                await Linking.openURL(terms_and_conditions_url);
            }
        }
    }, [terms_and_conditions_url]);

    const app_data: {
        [key: string]: {
            value?: string | boolean | null;
            onPress?: () => void;
            subview?: React.FC;
        };
    } = React.useMemo(
        () => ({
            Version: {
                value: Updates.runtimeVersion,
            },
            'Update At': {
                value: Updates.createdAt
                    ? formatDateTime({ date: Updates.createdAt, locale: 'ZA' })
                    : 'N/A',
            },
            OS: {
                value: `${Device.osName} / ${Device.osVersion}`,
            },
            Model: {
                value: Device.modelName,
            },
            'Terms & Conditions': {
                onPress: pressOpenTerms,
            },
        }),
        [pressOpenTerms]
    );

    return (
        <ScreenView
            paddingVertical="m"
            gap="l"
            // justifyContent="space-between"
            // use_navbar_spacer={true}
        >
            <Flex direction="column">
                {Object.entries(app_data).map(([row_key, row]) => (
                    <Row
                        gap="s"
                        padding="s"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottomWidth={1}
                        borderColor="line"
                        key={row_key}
                        width="100%"
                    >
                        {row?.onPress ? (
                            <PressableOpacity
                                hitSlop={50}
                                onPress={row.onPress}
                            >
                                <Text
                                    variant="footnote_bold"
                                    color="text_emphasis"
                                >
                                    {row_key}
                                </Text>
                            </PressableOpacity>
                        ) : (
                            <Text variant="footnote_bold">{row_key}</Text>
                        )}
                        {row.value && <Text variant="footnote_bold">{row.value}</Text>}
                    </Row>
                ))}
            </Flex>

            {updateAvailable && (
                <Button
                    onPress={downloadUpdate}
                    disabled={downloadingUpdate}
                >
                    Download available update
                </Button>
            )}
        </ScreenView>
    );
}

ApplicationDetails.Options = { title: 'Application Details' };

export { ApplicationDetails };
