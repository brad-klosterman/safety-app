import React, { ReactNode } from 'react';

import { Box, BoxProps } from './Box';

type FlexProps = {
    direction?: 'row' | 'column';
    children: ReactNode;
} & BoxProps;

/**
 * Flex
 * ---
 *
 * https://shopify.github.io/restyle/fundamentals/components/predefined-components
 *
 * https://reactnative.dev/docs/flexbox#layout-direction
 *
 */
const Flex = ({
    direction = 'row',
    alignItems = 'flex-start',
    gap = 'none',
    width = '100%',
    children,
    ...rest
}: FlexProps) => {
    return (
        <Box
            flexDirection={direction}
            alignItems={alignItems}
            gap={gap}
            width={width}
            {...rest}
        >
            {children}
        </Box>
    );
};

export { Flex, type FlexProps };

/*
https://reactnative.dev/docs/flexbox#layout-direction
 */
