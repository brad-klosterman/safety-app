import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import type { RootScreenProps } from '@navigation/type.Navigation';
import { Alarms } from '@state';
import Theme from '@theme';
import { formatDateTime } from '@utils';
import { Stack, Row, Text } from '@components/ui';
import { ScreenView } from '@components/elements';

import {
    AlarmProperty,
    AlarmZones,
    AlarmKeyholders,
    AlarmSteps,
    ClosedAlarm,
    AlarmLoading,
    AlarmButtons,
} from './atoms';

/**
 *   Alarm Overview Screen
 *   -----
 *
 **/
function AlarmOverview(props: RootScreenProps<'AlarmOverview'>) {
    const {
        route: {
            params: { id: alarm_id, source_type, address, non_emergency },
        },
        navigation: { navigate },
    } = props;

    const {
        state: { subscribed_alarm: alarm },
        dispatch,
    } = Alarms.useContext();

    const active = Alarms.isActiveAlarm(alarm?.state || 'OPENED');
    const [loading, setLoading] = useState(false);

    const {
        navigation: { navbar },
    } = Theme.useContext();

    React.useEffect(() => {
        dispatch({
            payload: { alarm_id },
            type: 'SUBSCRIBE_TO_ALARM',
        });
        return () => {
            dispatch({
                payload: { alarm_id: null },
                type: 'SUBSCRIBE_TO_ALARM',
            });
        };
    }, [alarm_id]);

    const pressDeactivate = () => {
        props.navigation.navigate('AlarmDeactivation', {
            alarm_id,
            source_type,
        });
    };

    const pressSendVehicle = async () => {
        setLoading(true);

        await dispatch({
            type: 'CONFIRM_EMERGENCY',
            payload: { alarm_id },
        }).then(() => setLoading(false));
    };

    const pressReopenAlarm = async () => {
        await dispatch({
            type: 'REOPEN_ALARM',
            payload: { alarm_id, source_type: 'BOX' },
        });
    };

    const pressAcknowledge = async () => {
        setLoading(true);

        await dispatch({
            type: 'DEACTIVATE_ALARM',
            payload: { alarm_id },
        }).then(() => setLoading(false));
    };

    const pressViewVideo = (video_url: string) => {
        navigate('AlarmVideo', {
            video_url,
        });
    };

    if (!alarm) return null;

    return (
        <>
            <ScreenView>
                <ScrollView>
                    <Stack justifyContent="center">
                        <Text
                            color="text_tertiary"
                            textAlign="center"
                            variant="footnote_bold"
                        >
                            UPDATED AT
                        </Text>
                        <Text
                            color="text_secondary"
                            textAlign="center"
                            variant="footnote_bold"
                        >
                            {formatDateTime({
                                date: alarm.updated_at,
                                format: 'dateTime',
                                locale: 'en-ZA',
                            })}
                        </Text>
                    </Stack>
                    <Stack
                        gap="m"
                        marginTop="l"
                    >
                        <AlarmProperty
                            video_url={alarm.video_url}
                            address={address}
                            transmitter={alarm.transmitter}
                            pressViewVideo={pressViewVideo}
                        />

                        <AlarmZones zones={alarm.zones || []} />
                        <AlarmKeyholders keyholders={alarm.keyholders || []} />
                        {active ? (
                            <AlarmSteps
                                alarm_id={alarm_id}
                                current_step={alarm.step || 0}
                                non_emergency={non_emergency}
                                reopened={Boolean(alarm.reopened_at)}
                            />
                        ) : (
                            <ClosedAlarm
                                alarm_id={alarm_id}
                                stack_allocation={alarm.initial_alarm_allocation}
                                responder={alarm.responder}
                                cancel_reason={alarm.cancel_reason}
                                cancel_source={alarm.cancel_source}
                            />
                        )}
                    </Stack>
                </ScrollView>
            </ScreenView>

            <Row
                position="absolute"
                bottom={navbar.height}
                left={0}
                right={0}
                backgroundColor="background_primary"
                padding="m"
            >
                <AlarmLoading visible={loading} />
                {alarm && (
                    <AlarmButtons
                        alarm_id={alarm_id}
                        visible={Boolean(active && alarm && !loading)}
                        alarm_state={alarm.state}
                        alarm_source_type={alarm.source_type}
                        non_emergency={non_emergency}
                        reopened={Boolean(alarm.reopened_at)}
                        pressDeactivate={pressDeactivate}
                        pressSendVehicle={pressSendVehicle}
                        pressReopenAlarm={pressReopenAlarm}
                        pressAcknowledge={pressAcknowledge}
                    />
                )}
            </Row>
        </>
    );
}

export { AlarmOverview };
