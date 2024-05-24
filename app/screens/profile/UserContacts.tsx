import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { RootScreenProps } from '@navigation/type.Navigation';
import { ScreenView, ActionSheet } from '@components/elements';
import { Form } from '@components/ui';

/**
 *   User Contact Details
 *   -----
 *
 **/

type FormFields = {
    emergency_contact_firstname: string | null;
    emergency_contact_lastname: string | null;
    emergency_contact_phone: string | null;
};

const UserContactsForm = () => {
    const form = useFormContext<FormFields>();

    return (
        <ActionSheet>
            <ActionSheet>
                <ActionSheet.Item
                    position="top"
                    type="input"
                >
                    <Form.Input
                        label="Emergency Contact First Name"
                        name="emergency_contact_firstname"
                        control={form.control}
                    />
                </ActionSheet.Item>
                <ActionSheet.Item
                    position="middle"
                    type="input"
                >
                    <Form.Input
                        label="Emergency Contact Last Name"
                        name="emergency_contact_lastname"
                        control={form.control}
                    />
                </ActionSheet.Item>
                <ActionSheet.Item
                    position="bottom"
                    type="input"
                >
                    <Form.Input
                        label="Emergency Contact Phone Number"
                        name="emergency_contact_phone"
                        control={form.control}
                    />
                </ActionSheet.Item>
            </ActionSheet>
        </ActionSheet>
    );
};

function UserContacts(_props: RootScreenProps<'UserContacts'>) {
    return (
        <ScreenView paddingVertical="m">
            <UserContactsForm />
        </ScreenView>
    );
}

UserContacts.Options = { title: 'User Contacts' };

export { UserContacts, UserContactsForm };
