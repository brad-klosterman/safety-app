import React from 'react';

import { PressableOpacity, Flex, Text } from '@components/ui';
import { HeaderButtonProps } from './type.Header';

function HeaderButton(props: HeaderButtonProps) {
    return (
        <PressableOpacity
            {...props}
            hitSlop={50}
        >
            <Flex
                //justifyContent="center" for header right wemightneed to adjusst
                paddingHorizontal="s"
                // paddingHorizontal={padding ? 's' : 'none'}
                gap="s"
            >
                {props.children}
            </Flex>
        </PressableOpacity>
    );
}

HeaderButton.Title = (props: { title: string }) => (
    <Text
        variant="body"
        color="emphasis"
    >
        {props.title}
    </Text>
);

export { HeaderButton };
