import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alarms, type AlarmsType, Profile, SSP } from '@state';
import { Row, Button, Form } from '@components/ui';
import { ActionSheet } from '@components/elements';
import { convertArrayToOptions, hasEmptyItem } from '@utils';

const AlarmDeactivationForm = (props: {
    onSubmit(form_values: AlarmsType.DeactivateAlarmForm): void;
}) => {
    const AlarmsContext = Alarms.useContext();
    const SSPContext = SSP.useContext();
    const ProfileContext = Profile.useContext();

    const [password_options] = useState(
        convertArrayToOptions<string>(ProfileContext.security_password_options)
    );

    const [deactivate_reason_options] = useState(
        convertArrayToOptions<string>(SSPContext.close_alarm_reasons)
    );

    const form = useForm<AlarmsType.DeactivateAlarmForm>({
        mode: 'onChange',
    });

    return (
        <>
            <ActionSheet>
                <ActionSheet.Item
                    position="top"
                    type="input"
                >
                    <Form.Selector<AlarmsType.DeactivateAlarmForm, string>
                        label="Security password"
                        control={form.control}
                        name="selected_password"
                        items={password_options}
                    />
                </ActionSheet.Item>
                <ActionSheet.Item
                    position="bottom"
                    type="input"
                >
                    <Form.Selector<AlarmsType.DeactivateAlarmForm, string>
                        label="Deactivation reason"
                        control={form.control}
                        name="deactivation_reason"
                        items={deactivate_reason_options}
                        small_font={true}
                    />
                </ActionSheet.Item>
            </ActionSheet>
            <Row paddingTop="l">
                <Button
                    variant="danger_secondary"
                    fit_width
                    onPress={form.handleSubmit(props.onSubmit)}
                    disabled={hasEmptyItem(
                        form.watch(['deactivation_reason', 'selected_password'])
                    )}
                >
                    Confirm Deactivation
                </Button>
            </Row>
        </>
    );
};

export { AlarmDeactivationForm };
