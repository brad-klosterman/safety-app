import React from 'react';

import { Flex, Text } from '@components/ui';

const ActiveAlarmsBanner = (props: { active_count: number }) =>
    props.active_count ? (
        <Flex
            direction="column"
            padding="s"
            backgroundColor="pill_danger_background"
            borderBottomWidth={2}
            borderTopWidth={2}
            borderColor="pill_danger"
        >
            <Text
                variant="headline_bold"
                color="pill_danger"
            >
                {props.active_count} Active Alarm{props.active_count !== 1 && 's'}
            </Text>
        </Flex>
    ) : null;

export { ActiveAlarmsBanner };
