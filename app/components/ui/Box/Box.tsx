import { type ComponentPropsWithRef } from 'react';
import { createBox } from '@shopify/restyle';
import Animated from 'react-native-reanimated';

import type { ThemeModel } from '@theme';

type BoxProps = ComponentPropsWithRef<typeof Box>;

const Box = createBox<ThemeModel>();

const AnimatedBox = Animated.createAnimatedComponent(Box);

export { type BoxProps, Box, AnimatedBox };
