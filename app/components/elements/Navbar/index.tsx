import React from 'react';
import { Octicons } from '@expo/vector-icons';

const getNavbarIcon =
    (name: React.ComponentProps<typeof Octicons>['name']) =>
    ({ color, size }: { color: string; size: number }) =>
        (
            <Octicons
                name={name}
                color={color}
                size={size}
            />
        );

export { getNavbarIcon };
