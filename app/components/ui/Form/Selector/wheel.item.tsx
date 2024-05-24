import { memo } from 'react';
import { StyleSheet } from 'react-native';

import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
} from 'react-native-reanimated';

import { Text } from '@components/ui/Text/Text';
import { SelectorItemProps, SelectorValue } from './types';

function WheelItem<T extends SelectorValue>({
    option,
    layout: { height },
    input_range,
    translateY,
    small_font,
}: SelectorItemProps<T>) {
    const y = useDerivedValue(() =>
        interpolate(translateY.value, input_range, [-1, 0, 1], Extrapolate.CLAMP)
    );

    const animated_style = useAnimatedStyle(() => {
        return {
            transform: [
                { perspective: 500 },
                { rotateX: 90 * y.value + 'deg' },
                {
                    scale: 1 - 0.1 * Math.abs(y.value),
                },
            ],
        };
    });

    return (
        <Animated.View style={[animated_style, styles.item, { height }]}>
            <Text
                numberOfLines={1}
                style={[styles.label, { fontSize: small_font ? 16 : 22 }]}
            >
                {option.label}
            </Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    label: {
        textAlign: 'center',
    },
});

export default memo(WheelItem);
