import React from 'react';

import { Stack } from '@components/ui';
import { toSentenceUpper } from '@utils';
import { type AlarmsType } from '@state';
import { Section } from './Section';

const ClosedAlarm = ({
    cancel_source,
    cancel_reason,
    responder,
    alarm_id,
}: {
    cancel_source: string | null;
    cancel_reason: string | null;
    responder: string | null;
    stack_allocation: AlarmsType.AlarmStackAllocation | null;
    alarm_id: number;
}) => {
    return (
        <Section>
            <Section.Title title="AlarmModel OVERVIEW" />
            <Stack paddingLeft="xs">
                <Section.Row
                    title="ID:"
                    value={alarm_id}
                />
                <Section.Row
                    title="STATE:"
                    value="CLOSED"
                />
                {responder && (
                    <Section.Row
                        title="RESPONDER"
                        value={responder}
                    />
                )}
                {cancel_source && (
                    <Section.Row
                        title="CANCELED BY"
                        value={toSentenceUpper(cancel_source)}
                    />
                )}
                {cancel_reason && (
                    <Section.Row
                        title="CANCEL REASON:"
                        value={cancel_reason}
                    />
                )}
            </Stack>
        </Section>
    );
};

export { ClosedAlarm };
