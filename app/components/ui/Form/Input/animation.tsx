import { useEffect } from 'react';
import {
    Easing,
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const label_active_sizes = [12, 16];
const label_inactive_sizes = [17, 22];

export const DURATION = 150;
export const EASING = Easing.bezier(0.4, 0.0, 0.2, 1);

const useInputAnimation = ({ value }: { value: string | number | null }) => {
    const progress = useSharedValue(value ? 1 : 0);

    useEffect(() => {
        if (value && progress.value === 0) {
            progress.value = 1;
        }
    }, [value]);

    const styles = useAnimatedStyle(() => {
        const translateY = interpolate(progress.value, [0, 1], [11, 0], {
            extrapolateRight: Extrapolation.CLAMP,
        });

        const lineHeight = interpolate(
            progress.value,
            [0, 1],
            [label_inactive_sizes[1], label_active_sizes[1]],
            {
                extrapolateRight: Extrapolation.CLAMP,
            }
        );

        const fontSize = interpolate(
            progress.value,
            [0, 1],
            [label_inactive_sizes[0], label_active_sizes[0]],
            {
                extrapolateRight: Extrapolation.CLAMP,
            }
        );

        return {
            transform: [{ translateY }],
            lineHeight,
            fontSize,
        };
    });

    const onFocus = () => {
        progress.value = withTiming(1, { duration: DURATION, easing: EASING });
    };

    const onBlur = () => {
        if (!value) {
            progress.value = withTiming(0, { duration: DURATION, easing: EASING });
        }
    };

    const onSetEmpty = () => {
        if (!value) {
            progress.value = withTiming(0, { duration: DURATION, easing: EASING });
        }
    };

    return { onFocus, styles, onBlur, onSetEmpty };
};

export { useInputAnimation };
