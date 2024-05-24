import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { RootScreenProps } from '@navigation/type.Navigation';
import { Profile, type ProfileType } from '@state';
import Theme from '@theme';
import { ScreenView, ActionSheet } from '@components/elements';
import { Form } from '@components/ui';

/**
 *   User Medical Details
 *   -----
 *
 **/

type FormFields = {
    insurance_name: string | null;
    insurance_plan: string | null;
    insurance_policy_id: string | null;
    medical_conditions: string | null;
    bloodtype: ProfileType.ProfileMedical['bloodtype'];
};

const UserMedicalForm = () => {
    const form = useFormContext<FormFields>();

    return (
        <ActionSheet>
            <ActionSheet>
                <ActionSheet.Item
                    position="top"
                    type="input"
                >
                    <Form.Input
                        label="Medical Aid Name"
                        name="insurance_name"
                        control={form.control}
                    />
                </ActionSheet.Item>
                <ActionSheet.Item
                    position="middle"
                    type="input"
                >
                    <Form.Input
                        label="Medical Aid Plan"
                        name="insurance_plan"
                        control={form.control}
                    />
                </ActionSheet.Item>
                <ActionSheet.Item
                    position="middle"
                    type="input"
                >
                    <Form.Input
                        label="Medical Aid Member Number"
                        name="insurance_policy_id"
                        control={form.control}
                    />
                </ActionSheet.Item>
                <ActionSheet.Item
                    position="middle"
                    type="input"
                >
                    <Form.Input
                        label="Medical Conditions"
                        name="medical_conditions"
                        control={form.control}
                    />
                </ActionSheet.Item>
                <ActionSheet.Item
                    position="bottom"
                    type="input"
                >
                    <Form.Selector<FormFields, FormFields['bloodtype']>
                        label="Bloodtype"
                        name="bloodtype"
                        items={Profile.Form.SELECTOR_OPTIONS.BLOODTYPE}
                        control={form.control}
                    />
                </ActionSheet.Item>
            </ActionSheet>
        </ActionSheet>
    );
};

function UserMedical(_props: RootScreenProps<'UserMedical'>) {
    return (
        <ScreenView paddingVertical="m">
            <UserMedicalForm />
        </ScreenView>
    );
}

UserMedical.Options = { title: 'Medical Profile' };

export { UserMedical };
