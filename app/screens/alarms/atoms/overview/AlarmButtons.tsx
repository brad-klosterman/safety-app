import React from 'react';
import { Button, Flex } from '@components/ui';
import { Alarms, type AlarmsType } from '@state';

const AlarmButtons = ({
    alarm_state,
    alarm_id,
    alarm_source_type,
    non_emergency,
    reopened,
    pressDeactivate,
    pressSendVehicle,
    pressReopenAlarm,
    pressAcknowledge,
    visible,
}: {
    alarm_state: AlarmsType.AlarmState;
    alarm_id: number;
    alarm_source_type: AlarmsType.AlarmSource;
    non_emergency: boolean;
    reopened: boolean;
    pressDeactivate: (alarm_id: number, source_type: AlarmsType.AlarmSource) => void;
    pressSendVehicle: (alarm_id: number) => void;
    pressReopenAlarm: (alarm_id: number) => void;
    pressAcknowledge: (alarm_id: number) => void;
    visible: boolean;
}) => {
    const is_active = Alarms.isActiveAlarm(alarm_state);

    if (!visible) return null;

    if (non_emergency) {
        return (
            <Button
                fit_width
                variant="secondary"
                onPress={() => pressAcknowledge(alarm_id)}
            >
                Acknowledge
            </Button>
        );
    }

    return (
        <Flex
            alignItems="flex-end"
            flex={1}
        >
            {alarm_state === 'RESPONDER_CLOSED' && !reopened ? (
                <Flex gap="s">
                    <Button
                        variant="danger_secondary"
                        fit_width
                        onPress={() => pressReopenAlarm(alarm_id)}
                    >
                        I need help
                    </Button>
                    <Button
                        variant="primary"
                        fit_width
                        onPress={() => pressDeactivate(alarm_id, alarm_source_type)}
                    >
                        I’m safe
                    </Button>
                </Flex>
            ) : (
                <Flex gap="s">
                    {is_active && (
                        <Button
                            variant="danger_secondary"
                            fit_width
                            onPress={() => pressDeactivate(alarm_id, alarm_source_type)}
                        >
                            Deactivate
                        </Button>
                    )}
                    {alarm_state === 'OPENED' && (
                        <Button
                            fit_width
                            onPress={() => pressSendVehicle(alarm_id)}
                        >
                            Send Vehicle
                        </Button>
                    )}
                </Flex>
            )}
        </Flex>
    );
};
export { AlarmButtons };
