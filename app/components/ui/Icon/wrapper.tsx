import { useTheme } from '@shopify/restyle';
// eslint-disable-next-line import/no-named-as-default
import Svg, { Path } from 'react-native-svg';

import type { ThemeColor } from '@theme';
import { Box } from '../Box/Box';

import type { IconProps, IconWrapperProps } from './types';

function withIconWrapper({ name, paths, viewbox }: IconWrapperProps) {
    const IconWrapper = ({ size = 24, color, type = 'ghost' }: IconProps) => {
        const theme = useTheme();

        const path_color = theme.colors[`${color as ThemeColor}`];

        const icon = (
            <Svg
                viewBox={viewbox}
                width={size}
                height={size}
            >
                {paths.map((p, i) => (
                    <Path
                        key={i}
                        d={p}
                        fill={path_color}
                    />
                ))}
            </Svg>
        );

        if (type === 'ghost') {
            return icon;
        }

        return (
            <Box
                backgroundColor="text_contrast"
                borderRadius="s"
                width={size + theme.spacing.l}
                height={size + theme.spacing.l}
                alignItems="center"
                justifyContent="center"
            >
                {icon}
            </Box>
        );
    };

    IconWrapper.displayName = `Icon.${name}`;
    return IconWrapper;
}

export { withIconWrapper };
