import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Profile from '../ProfileProvider';
import type { ProfileFormFields } from '../types/User.types';
import { mapProfileFormFields } from './datamaps';

const ProfileFormProvider = (props: { children: React.ReactNode }) => {
    const ProfileContext = Profile.useContext();

    const ProfileForm = useForm<ProfileFormFields>({
        defaultValues: ProfileContext.profile
            ? mapProfileFormFields(ProfileContext.profile)
            : undefined,
    });

    return <FormProvider {...ProfileForm}>{props.children}</FormProvider>;
};

export default { Provider: ProfileFormProvider };
