import React, { Children, ReactNode } from 'react';

import type { ThemeSpace } from '@theme';
import { Box, BoxProps } from './Box';

type StackProps = BoxProps & {
    gap?: ThemeSpace;
    children: ReactNode;
};

const Stack = ({ gap = 'none', children, ...props }: StackProps) => {
    let real_index = -1;
    return (
        <Box {...props}>
            {Children.map(children, (child, i) => {
                if (!child) return null;
                real_index += 1;
                return (
                    <React.Fragment key={i}>
                        {real_index > 0 && <Box marginTop={gap} />}
                        {child}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export { type StackProps, Stack };
