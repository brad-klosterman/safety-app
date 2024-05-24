import { Pressable } from 'react-native';

import { Box } from '@components/ui/Box/Box';
import type { ButtonBaseProps } from './types';

function PressableOpacity({ children, ...props }: ButtonBaseProps) {
    return (
        <Pressable
            accessibilityRole="button"
            {...props}
        >
            {({ pressed }) => (
                <Box opacity={props.disabled ? 0.35 : pressed ? 0.6 : 1}>{children}</Box>
            )}
        </Pressable>
    );
}

export { PressableOpacity };
