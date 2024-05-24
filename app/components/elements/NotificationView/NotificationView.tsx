import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { styled } from '@theme';
import { PressableOpacity, Box, Row, Stack, Text, Icon } from '@components/ui';
import { formatDateTime } from '@utils';

import { Alarms, type AlarmsType, Notifications } from '@state';

function NotificationView() {
    const NotificationsContext = Notifications.useContext();

    const [loading, setLoading] = React.useState(false);

    const notification_count = NotificationsContext.data.length;
    const notification = NotificationsContext.data[0];

    const closeNotification = () => {
        NotificationsContext.updateState({
            type: 'REMOVE_NOTIFICATION',
            payload: { alarm_id },
        });
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

    const styles = useStyles();

    if (notification_count <= 0) {
        return null;
    }

    return (
        <Box style={styles.overlay}>
            <Box
                style={styles.container}
                marginTop="xl"
            >
                <ScrollView>
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

                    <Stack
                        flex={1}
                        paddingHorizontal="l"
                    >
                        <></>
                    </Stack>
                </ScrollView>
            </Box>
        </Box>
    );
}

const useStyles = styled((theme) => ({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: theme.colors.background_primary,
        borderTopRightRadius: theme.borderRadii.xl,
        borderTopLeftRadius: theme.borderRadii.xl,
        overflow: 'hidden',
        //marginTop: theme.spacing.xl
    },

    // otp_container: { width: 300, height: 60, alignSelf: 'center' },
    // input: {
    //     width: 45,
    //     height: 45,
    //     borderWidth: 1,
    //     borderRadius: theme.borderRadii.m,
    //     color: theme.colors.line,
    // },
    // input_border: {
    //     borderColor: theme.colors.line,
    // },
    // input_border_error: {
    //     borderColor: theme.colors.danger,
    // },
    // highlight: {
    //     borderColor: theme.colors.emphasis,
    // },
}));

export { NotificationView };
