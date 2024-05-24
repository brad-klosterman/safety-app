import React from 'react';

import { Text, PressableOpacity, Box } from '@components/ui';

const AlarmsHeaderRight = (props: { openSearch(): void; active_filters_count: number }) => (
    <Box paddingHorizontal="m">
        <PressableOpacity
            hitSlop={50}
            onPress={() => props.openSearch()}
        >
            <Text
                color="emphasis"
                variant="headline"
            >
                Filters ({props.active_filters_count})
            </Text>
        </PressableOpacity>
    </Box>
);

export { AlarmsHeaderRight };
