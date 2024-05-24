import React from 'react';
import { useForm } from 'react-hook-form';
import * as Location from 'expo-location';

import type { RootScreenProps } from '@navigation/type.Navigation';
import { Profile, type ProfileType } from '@state';
import Theme, { type ThemeVariantPreference, type ThemeVariant } from '@theme';
import { ScreenView, ActionSheet } from '@components/elements';
import { Form } from '@components/ui';

/**
 *   User Settings
 *   -----
 *
 **/

type FormFields = {
    phone_number: string | null;
    main_ssp_provider: string | null;
    language: string | null;
    contrast_mode: ThemeVariant;
};

function UserSettings(props: RootScreenProps<'UserSettings'>) {
    const navigate = props.navigation.navigate;

    const ProfileContext = Profile.useContext();
    const { profile } = ProfileContext;

    //const [selected_contrast_mode, setSelectedContrastMode] = useThemeContrastStorage();
    const [location_status, requestLocationPermission] = Location.useForegroundPermissions();

    const contrast_mode = 'light';

    const form = useForm<FormFields>({
        defaultValues: {
            phone_number: profile?.phone_number,
            language: 'english',
            contrast_mode,
            main_ssp_provider: profile?.ssp.name,
        },
    });
    const { watch } = form;

    const selectedContrastMode = React.useCallback((contrast_mode: ThemeVariantPreference) => {
        //
    }, []);

    React.useEffect(() => {
        const subscription = watch((values, { name, type }) => {
            if (name === 'contrast_mode' && type === 'change' && values.contrast_mode) {
                selectedContrastMode(values.contrast_mode);
            }
        });
        return () => subscription.unsubscribe();
    }, [selectedContrastMode, watch]);

    return (
        <ScreenView>
            <ActionSheet>
                <ActionSheet.Item
                    position="top"
                    type="input"
                >
                    <Form.Input
                        label="Main Security Provider"
                        name="main_ssp_provider"
                        control={form.control}
                    />
                </ActionSheet.Item>
                <ActionSheet.Item
                    position="middle"
                    type="input"
                >
                    <Form.Input
                        label="Language"
                        name="language"
                        control={form.control}
                    />
                </ActionSheet.Item>
                <ActionSheet.Item
                    position="middle"
                    type="select"
                >
                    <Form.Selector
                        label="Contrast Mode"
                        name="contrast_mode"
                        //items={THEME_CONTRAST_OPTIONS}
                        items={[]}
                        control={form.control}
                    />
                </ActionSheet.Item>
                <ActionSheet.Item
                    label="Security Password"
                    value={'••••••'}
                    position="middle"
                    type="nav_input"
                    onPress={() => navigate('UserPassword')}
                />
                <ActionSheet.Item
                    label="Location Services"
                    value={location_status?.granted ? 'ON' : 'OFF'}
                    position="middle"
                    type="info"
                    onPress={!location_status?.granted ? requestLocationPermission : undefined}
                />
                <ActionSheet.Item
                    label="Mobile Panics"
                    value={profile?.security.panics_allowed ? 'ON' : 'OFF'}
                    position="bottom"
                    type="info"
                />
            </ActionSheet>
        </ScreenView>
    );
}

UserSettings.Options = { title: 'User Settings' };

export { UserSettings };
