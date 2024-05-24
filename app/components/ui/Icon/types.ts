import type { ThemeColor } from '@theme';

import { Icon } from './Icon';

type IconProps = {
    size?: number;
    color?: ThemeColor;
    type?: 'ghost' | 'filled' | 'outlined';
};

type IconSVG = {
    paths: string[];
    viewbox: string;
};

type IconWrapperProps = IconSVG & {
    name: string;
};

type IconType = typeof Icon;
type IconName = keyof IconType;

export { IconProps, IconSVG, IconWrapperProps, IconType, IconName };
