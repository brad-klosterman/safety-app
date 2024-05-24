import React, { memo, useState } from 'react';

import { Modal } from '@components/elements';
import { formatDateTime } from '@utils';
import { AlarmsType } from '@state';
import { Section } from './Section';

const CONDENSED_LIST_LENGTH = 3;

const AlarmZonesList = memo(
    (props: {
        zones: AlarmsType.AlarmTriggeredZones[];
        onPressOpen(): void;
        modal_open: boolean;
    }) => {
        const zones = props.zones;

        return (
            <Section modal_open={props.modal_open}>
                <Section.Title
                    title={`TRIGGERED ZONES (${zones.length})`}
                    expander={
                        !props.modal_open && zones.length > CONDENSED_LIST_LENGTH
                            ? { title: 'VIEW ALL', onPress: props.onPressOpen }
                            : null
                    }
                />

                <Section.Content>
                    {zones
                        .slice(0, props.modal_open ? zones.length : CONDENSED_LIST_LENGTH)
                        .map((zone) => (
                            <Section.Row
                                key={zone.id}
                                title={`${
                                    formatDateTime({
                                        date: zone?.created_at,
                                        format: 'time',
                                        locale: 'en-ZA',
                                    }) || 'ZONE'
                                }`}
                                value={zone.number}
                                modal_open={props.modal_open}
                            />
                        ))}
                </Section.Content>
            </Section>
        );
    }
);

const AlarmZones = (props: {
    zones: AlarmsType.AlarmTriggeredZones[];
    is_notification?: boolean;
}) => {
    const zones = props.zones;

    const [modal_open, setModalOpen] = useState(false);

    if (!zones) {
        return null;
    }

    return (
        <>
            <AlarmZonesList
                zones={zones}
                onPressOpen={() => setModalOpen(true)}
                modal_open={modal_open}
            />
            <Modal
                onPressClose={() => setModalOpen(false)}
                visible={modal_open}
                without_route={props.is_notification}
            >
                <AlarmZonesList
                    zones={zones}
                    onPressOpen={() => setModalOpen(true)}
                    modal_open={modal_open}
                />
            </Modal>
        </>
    );
};

export { AlarmZones };
