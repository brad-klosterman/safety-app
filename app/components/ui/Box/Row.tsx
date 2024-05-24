import React, { Children, ReactNode } from 'react';

import type { ThemeSpace } from '@theme';
import { Box, BoxProps } from './Box';

type RowProps = BoxProps & {
    gap?: ThemeSpace;
    children: ReactNode;
};

const Row = ({ gap = 'none', children, ...props }: RowProps) => {
    let real_index = -1;
    return (
        <Box
            flexDirection="row"
            alignItems="center"
            {...props}
        >
            {Children.map(children, (child, i) => {
                if (!child) return null;
                real_index += 1;
                return (
                    <React.Fragment key={i}>
                        {real_index > 0 && <Box marginLeft={gap} />}
                        {child}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

/** Exports */

export { Row, type RowProps };
