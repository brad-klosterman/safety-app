import { HeaderLeft } from '@components/elements/Header/HeaderLeft';
import React, { memo, useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { PressableOpacity, Box, Row, Stack, Text, Icon } from '@components/ui';
import { formatDateTime } from '@utils';

import { Alarms, type AlarmsType, Notifications } from '@state';

import {
    AlarmButtons,
    AlarmKeyholders,
    AlarmProperty,
    AlarmLoading,
    AlarmSteps,
    AlarmZones,
    ClosedAlarm,
    AlarmDeactivationForm,
} from './';

const AlarmNotification = memo(() => {
    const AlarmsContext = Alarms.useContext();
    const NotificationsContext = Notifications.useContext();

    const [loading, setLoading] = useState(false);
    const [sub_view, setSubView] = useState<'Alarm Video' | 'Deactivate Alarm' | null>(null);

    const notification_count = NotificationsContext.data.length;
    const notification = NotificationsContext.data[0];
    const alarm = notification?.alarm;
    const alarm_id = notification?.alarm.id;
    const is_active = Alarms.isActiveAlarm(alarm?.state);
    const video_url = alarm?.video_url;

    const closeNotification = () => {
        NotificationsContext.updateState({
            type: 'REMOVE_NOTIFICATION',
            payload: { alarm_id },
        });
        setSubView(null);
    };

    const updateNotification = (updated_alarm: AlarmsType.AlarmModel) => {
        NotificationsContext.updateState({
            type: 'UPDATE_NOTIFICATION_DATA',
            payload: {
                title: notification.title,
                message: 'Alarm Updated',
                alarm: updated_alarm,
            },
        });
    };

    function onAlarmUpdated(updated_alarm: AlarmsType.AlarmModel | null) {
        if (updated_alarm) updateNotification(updated_alarm);
        setLoading(false);
    }

    const submitDeactivationForm = useCallback(
        async (form_values: AlarmsType.DeactivateAlarmForm) => {
            setLoading(true);
            setSubView(null);
            AlarmsContext.dispatch({
                type: 'DEACTIVATE_ALARM',
                payload: {
                    alarm_id,
                    source_type: 'BOX',
                    close_reason: form_values.deactivation_reason,
                    security_answer: form_values.selected_password,
                },
            });
            //.then(onAlarmUpdated);
        },
        [alarm_id]
    );

    const pressSendVehicle = async (alarm_id: number) => {
        setLoading(true);
        AlarmsContext.dispatch({
            type: 'CONFIRM_EMERGENCY',
            payload: { alarm_id },
        });
        //.then(onAlarmUpdated);
    };

    const pressReopenAlarm = async (alarm_id: number) => {
        setLoading(true);
        AlarmsContext.dispatch({
            type: 'REOPEN_ALARM',
            payload: { alarm_id, source_type: 'BOX' },
        });
        //.then(onAlarmUpdated);
    };

    const pressAcknowledge = async (id: number) => {
        setLoading(true);
        AlarmsContext.dispatch({
            type: 'DEACTIVATE_ALARM',
            payload: { alarm_id },
        });
        //.then(onAlarmUpdated);
    };

    if (notification_count <= 0) {
        return null;
    }

    return (
        <Box style={styles.overlay}>
            <Box
                width="100%"
                flex={1}
                backgroundColor="background_primary"
                borderTopRightRadius="xl"
                borderTopLeftRadius="xl"
                overflow="hidden"
                marginTop="xl"
            >
                <ScrollView>
                    {sub_view ? (
                        <Row paddingTop="m">
                            <HeaderLeft onPress={() => setSubView(null)} />
                        </Row>
                    ) : (
                        <Row
                            justifyContent="flex-end"
                            padding="m"
                        >
                            <PressableOpacity
                                hitSlop={50}
                                onPress={closeNotification}
                            >
                                <Icon.Close />
                            </PressableOpacity>
                        </Row>
                    )}

                    <Stack
                        flex={1}
                        paddingHorizontal="l"
                    >
                        {sub_view ? (
                            <Stack
                                paddingVertical="m"
                                gap="s"
                            >
                                <Text variant="title_1_bold">{sub_view}</Text>
                                {sub_view === 'Deactivate Alarm' && (
                                    <AlarmDeactivationForm onSubmit={submitDeactivationForm} />
                                )}
                                {sub_view === 'Alarm Video' && video_url && (
                                    <WebView
                                        mediaPlaybackRequiresUserAction={false}
                                        allowsInlineMediaPlayback={false}
                                        source={{ uri: video_url }}
                                    />
                                )}
                            </Stack>
                        ) : (
                            <Stack
                                flex={1}
                                gap="m"
                            >
                                <Stack justifyContent="center">
                                    <Text
                                        variant="large_title_bold"
                                        textAlign="center"
                                    >
                                        {alarm.alarm_type}
                                    </Text>
                                    <Text
                                        color="text_secondary"
                                        variant="footnote_bold"
                                        textAlign="center"
                                    >
                                        {formatDateTime({
                                            date: alarm?.updated_at,
                                            format: 'dateTime',
                                            locale: 'en-ZA',
                                        }) || ''}
                                    </Text>
                                </Stack>
                                <AlarmProperty
                                    video_url={alarm?.video_url}
                                    address={alarm.address}
                                    transmitter={alarm?.transmitter}
                                    pressViewVideo={() => setSubView('Alarm Video')}
                                />
                                <AlarmZones
                                    zones={alarm.zones || []}
                                    is_notification={true}
                                />
                                <AlarmKeyholders
                                    keyholders={alarm.keyholders || []}
                                    is_notification={true}
                                />

                                {is_active ? (
                                    <AlarmSteps
                                        alarm_id={alarm_id}
                                        current_step={alarm.step}
                                        non_emergency={alarm?.non_emergency}
                                        reopened={Boolean(alarm?.reopened_at)}
                                    />
                                ) : (
                                    <ClosedAlarm
                                        alarm_id={alarm_id}
                                        stack_allocation={alarm?.initial_alarm_allocation}
                                        responder={alarm?.responder}
                                        cancel_reason={alarm?.cancel_reason}
                                        cancel_source={alarm?.cancel_source}
                                    />
                                )}
                                <AlarmLoading visible={loading} />
                                {is_active && (
                                    <AlarmButtons
                                        visible={Boolean(alarm && !loading)}
                                        alarm_id={alarm_id}
                                        alarm_state={alarm.state}
                                        alarm_source_type={alarm.source_type}
                                        non_emergency={alarm?.non_emergency}
                                        reopened={Boolean(alarm?.reopened_at)}
                                        pressDeactivate={() => setSubView('Deactivate Alarm')}
                                        pressSendVehicle={pressSendVehicle}
                                        pressReopenAlarm={pressReopenAlarm}
                                        pressAcknowledge={pressAcknowledge}
                                    />
                                )}
                            </Stack>
                        )}
                    </Stack>
                </ScrollView>
            </Box>
        </Box>
    );
});

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export { AlarmNotification };
