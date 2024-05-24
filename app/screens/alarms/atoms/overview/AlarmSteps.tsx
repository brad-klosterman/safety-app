import React, { memo } from 'react';

import { Flex, Text, Icon } from '@components/ui';
import { Section } from './Section';

const AlarmStep = (props: { step: number; current_step: number; step_name: string }) => {
    const { step, current_step, step_name } = props;

    const completed = step <= current_step;
    return (
        <Flex gap="s">
            <Icon.XSmallCheck
                size={12}
                color={completed ? 'text_emphasis' : 'text_tertiary'}
            />
            <Text
                variant={completed ? 'footnote_bold' : 'footnote'}
                color={step <= current_step ? 'text_secondary' : 'text_tertiary'}
            >
                {step_name}
            </Text>
        </Flex>
    );
};

const AlarmSteps = memo(
    (props: {
        alarm_id: number;
        current_step: number;
        non_emergency: boolean;
        reopened: boolean;
    }) => {
        const { alarm_id, current_step, non_emergency, reopened } = props;
        return (
            <Section>
                <Section.Title title="AlarmModel OVERVIEW" />
                <Section.Content>
                    <Section.Row
                        title="ID:"
                        value={alarm_id}
                    />
                    {non_emergency ? (
                        <AlarmStep
                            step={1}
                            current_step={0}
                            step_name="Acknowledged Non Emergency"
                        />
                    ) : (
                        <>
                            <AlarmStep
                                step={2}
                                current_step={current_step}
                                step_name="Keyholder Confirmed"
                            />
                            <AlarmStep
                                step={3}
                                current_step={current_step}
                                step_name="Responder Dispatched"
                            />
                            <AlarmStep
                                step={4}
                                current_step={current_step}
                                step_name="Responder Enroute"
                            />
                            <AlarmStep
                                step={6}
                                current_step={current_step}
                                step_name="Responder All Clear"
                            />
                            {reopened && (
                                <AlarmStep
                                    step={6}
                                    current_step={current_step}
                                    step_name="Keyholder Reopened"
                                />
                            )}
                            <AlarmStep
                                step={7 || 8}
                                current_step={current_step}
                                step_name="Customer Confirmed Clear"
                            />
                        </>
                    )}
                </Section.Content>
            </Section>
        );
    }
);

export { AlarmSteps };
