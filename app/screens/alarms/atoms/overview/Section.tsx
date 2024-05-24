import React, { ReactElement, ReactNode } from 'react';

import { Flex, Stack, Text, PressableOpacity } from '@components/ui';

const Section = (props: { children: ReactNode; modal_open?: boolean }) => {
    return (
        <Flex
            direction="column"
            gap={props.modal_open ? 's' : 'xxs'}
            padding={props.modal_open ? 'm' : 'none'}
        >
            {props.children}
        </Flex>
    );
};

const Title = (props: {
    title: string;
    expander?: { title: string; onPress(): void } | null;
    modal_open?: boolean;
}) => {
    return (
        <Flex
            alignItems="center"
            gap="s"
        >
            <Text variant={props.modal_open ? 'title_2_bold' : 'headline_bold'}>{props.title}</Text>
            {props.expander && (
                <PressableOpacity
                    hitSlop={50}
                    onPress={props.expander.onPress}
                >
                    <Text
                        color="emphasis"
                        variant="caption_1_bold"
                    >
                        {props.expander.title}
                    </Text>
                </PressableOpacity>
            )}
        </Flex>
    );
};

const Content = (props: { children: ReactElement | ReactElement[] }) => (
    <Stack paddingLeft="xs">{props.children}</Stack>
);

const SectionRow = (props: {
    title: string;
    value?: string | number | null;
    modal_open?: boolean;
}) => (
    <Flex gap="xs">
        <Text
            color="text_secondary"
            variant={props.modal_open ? 'subheadline_bold' : 'footnote_bold'}
        >
            {props.title}
        </Text>
        {props.value && (
            <Text
                color="text_tertiary"
                variant={props.modal_open ? 'subheadline_bold' : 'footnote_bold'}
            >
                {props.value || ''}
            </Text>
        )}
    </Flex>
);

Section.Title = Title;
Section.Content = Content;
Section.Row = SectionRow;

export { Section };
