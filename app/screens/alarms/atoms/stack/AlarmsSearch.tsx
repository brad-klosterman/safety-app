import React, { memo, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Profile, type AlarmsType } from '@state';
import { Row, Stack, Text, Button, Form, type SelectorOption, Loading } from '@components/ui';
import { ActionSheet } from '@components/elements';

const DEFAULT_ALARMS_FILTER: AlarmsType.AlarmsFilter = {
    date_range: undefined,
    property: undefined,
};

const DATE_RANGE_OPTIONS: SelectorOption<number>[] = [
    { label: 'Last 7 Days', value: 7 },
    { label: 'Last 30 Days', value: 30 },
];

const AlarmsSearch = memo(
    (props: {
        active_filters: AlarmsType.AlarmsFilter | undefined;
        onClose(): void;
        onApply: (filters: AlarmsType.AlarmsFilter) => unknown;
        loading: boolean;
    }) => {
        const ProfileContext = Profile.useContext();

        const form = useForm<AlarmsType.AlarmsFilter>({ defaultValues: props.active_filters });

        const property_options = useMemo(
            () =>
                ProfileContext.profile?.properties.reduce(
                    (acc: Array<SelectorOption<string | null>>, property) => [
                        ...acc,
                        {
                            label: property.address,
                            value: property.address,
                        },
                    ],
                    [{ label: '', value: null }]
                ) || [],
            [ProfileContext.profile]
        );

        const applyChanges = () => {
            props.onApply(form.getValues());
        };

        const cancelChanges = () => {
            form.reset();
            props.onClose();
        };

        const resetForm = async () => {
            form.reset(DEFAULT_ALARMS_FILTER);
            setTimeout(function () {
                props.onApply(DEFAULT_ALARMS_FILTER);
            }, 500);
        };

        return (
            <Stack
                gap="m"
                padding="m"
            >
                <Row justifyContent="space-between">
                    <Text variant="title_1_bold">Alarms Filter</Text>
                </Row>
                <ActionSheet>
                    <ActionSheet.Item
                        position="top"
                        type="input"
                    >
                        <Form.Selector<AlarmsType.AlarmsFilter, number>
                            label="Date Range"
                            control={form.control}
                            name="date_range"
                            items={DATE_RANGE_OPTIONS}
                            visible_items={3}
                        />
                    </ActionSheet.Item>
                    <ActionSheet.Item
                        position="bottom"
                        type="input"
                    >
                        <Form.Selector<AlarmsType.AlarmsFilter, string | null>
                            label="Property"
                            control={form.control}
                            name="property"
                            items={property_options}
                            small_font
                        />
                    </ActionSheet.Item>
                </ActionSheet>
                <Text
                    color="text_emphasis"
                    paddingBottom="m"
                    textAlign="right"
                    variant="button"
                    onPress={resetForm}
                >
                    Reset All Values
                </Text>
                <Row gap="s">
                    <Button
                        variant="secondary"
                        onPress={cancelChanges}
                        fit_width
                    >
                        Cancel
                    </Button>
                    {form.formState.isDirty && (
                        <Button
                            variant="primary"
                            onPress={applyChanges}
                            fit_width
                        >
                            Apply
                        </Button>
                    )}
                </Row>
                {props.loading && <Loading />}
            </Stack>
        );
    }
);

export { AlarmsSearch };
