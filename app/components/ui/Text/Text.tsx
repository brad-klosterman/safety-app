import { createText } from '@shopify/restyle';
import Animated from 'react-native-reanimated';
import type { ThemeModel } from '@theme';

const Text = createText<ThemeModel>();

const AnimatedText = Animated.createAnimatedComponent(Text);

export { Text, AnimatedText };
