import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { RootScreenProps } from '@navigation/type.Navigation';
import { Profile, type ProfileType } from '@state';

import { ScreenView, ActionSheet } from '@components/elements';
import { Form } from '@components/ui';
import { HeaderSave } from "./atoms/HeaderSave";

/**
 *   User Details Screen
 *   -----
 *
 **/

type FormFields = {
    firstname?: string;
    lastname?: string;
    gender: ProfileType.ProfileMedical['gender'] | null;
    year_of_birth: string | undefined;
};

const UserDetailsForm = () => {
    const form = useFormContext<FormFields>();

    return (
        <ActionSheet>
            <ActionSheet.Item
                position="top"
                type="input"
            >
                <Form.Input
                    label="First Name"
                    name="firstname"
                    autoComplete="name"
                    rules={{ required: 'Please enter your first name' }}
                    returnKeyType="done"
                    control={form.control}
                />
            </ActionSheet.Item>
            <ActionSheet.Item
                position="middle"
                type="input"
            >
                <Form.Input
                    label="Last Name"
                    name="lastname"
                    autoComplete="name-family"
                    rules={{ required: 'Please enter your last name' }}
                    returnKeyType="done"
                    control={form.control}
                />
            </ActionSheet.Item>
            <ActionSheet.Item
                position="middle"
                type="input"
            >
                <Form.Selector<FormFields, FormFields['gender']>
                    label="Gender"
                    name="gender"
                    rules={{ required: 'Please enter your birthday' }}
                    items={Profile.Form.SELECTOR_OPTIONS.GENDER}
                    visible_items={3}
                    control={form.control}
                />
            </ActionSheet.Item>
            <ActionSheet.Item
                position="bottom"
                type="input"
            >
                <Form.Selector<FormFields, string>
                    label="Year of Birth"
                    name="year_of_birth"
                    rules={{ required: 'Please enter your birthday' }}
                    items={Profile.Form.SELECTOR_OPTIONS.BIRTHDAY}
                    control={form.control}
                />
            </ActionSheet.Item>
        </ActionSheet>
    );
};

function UserDetails(_props: RootScreenProps<'UserDetails'>) {
    return (
        <ScreenView paddingVertical="m">
            <UserDetailsForm />
        </ScreenView>
    );
}

UserDetails.Options = { title: 'User Details', headerRight: HeaderSave };

export { UserDetails, UserDetailsForm };
