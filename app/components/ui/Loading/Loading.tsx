import React from 'react';

import { Flex } from '@components/ui/Box';
import { Text } from '@components/ui/Text/Text';
import { ProgressIndicator } from './ProgressIndicator';

const Loading = (props: { text?: string; visible?: boolean }) => {
    if (!props.visible) {
        return null;
    }

    return (
        <Flex
            direction="column"
            alignItems="center"
            gap="s"
        >
            <Text
                color="text_primary"
                variant="subheadline"
                style={{ letterSpacing: 3 }}
            >
                {props.text || 'LOADING'}
            </Text>
            <ProgressIndicator
                duration={1000}
                itemWidth={16}
                itemHeight={8}
                itemsOffset={4}
                topScale={4}
            />
        </Flex>
    );
};

export { Loading };
