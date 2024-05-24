import React, { memo, useState } from 'react';
import { Row, Text, Icon } from '@components/ui';
import { Modal } from '@components/elements';
import { removeUnderscore } from '@utils';
import { AlarmsType } from '@state';
import { Section } from './Section';

const INITIAL_AMOUNT = 3;

const AlarmKeyholdersList = memo(
    (props: {
        keyholders: AlarmsType.PropertyKeyholderModel[];
        onPressOpen(): void;
        modal_open: boolean;
    }) => {
        const keyholders = props.keyholders;

        return (
            <Section modal_open={props.modal_open}>
                <Section.Title
                    title={`KEYHOLDERS (${keyholders.length})`}
                    expander={
                        !props.modal_open && keyholders.length > INITIAL_AMOUNT
                            ? { title: 'VIEW ALL', onPress: props.onPressOpen }
                            : null
                    }
                    modal_open={props.modal_open}
                />

                <Section.Content>
                    {keyholders
                        .slice(0, props.modal_open ? keyholders.length : INITIAL_AMOUNT)
                        .map((keyholder) => (
                            <Row
                                key={keyholder.id}
                                gap="s"
                            >
                                <Icon.XSmallCheck
                                    size={11}
                                    color={
                                        keyholder.notification_status
                                            ? 'text_emphasis'
                                            : 'text_tertiary'
                                    }
                                />
                                <Text
                                    color={
                                        keyholder.notification_status
                                            ? 'text_secondary'
                                            : 'text_tertiary'
                                    }
                                    variant={
                                        props.modal_open ? 'subheadline_bold' : 'footnote_bold'
                                    }
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {keyholder.full_name}
                                </Text>

                                {keyholder.alarm_handling_status && (
                                    <Text
                                        color="text_secondary"
                                        variant="caption_1_bold"
                                    >
                                        ({removeUnderscore(keyholder.alarm_handling_status)})
                                    </Text>
                                )}
                            </Row>
                        ))}
                </Section.Content>
            </Section>
        );
    }
);

const AlarmKeyholders = (props: {
    keyholders: AlarmsType.PropertyKeyholderModel[];
    is_notification?: boolean;
}) => {
    const [modal_open, setModalOpen] = useState(false);

    return (
        <>
            <AlarmKeyholdersList
                keyholders={props.keyholders}
                onPressOpen={() => setModalOpen(true)}
                modal_open={modal_open}
            />
            <Modal
                onPressClose={() => setModalOpen(false)}
                visible={modal_open}
                without_route={props.is_notification}
            >
                <AlarmKeyholdersList
                    keyholders={props.keyholders}
                    onPressOpen={() => setModalOpen(true)}
                    modal_open={modal_open}
                />
            </Modal>
        </>
    );
};

export { AlarmKeyholders };
