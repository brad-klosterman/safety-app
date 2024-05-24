import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import {
    Extrapolation,
    SharedValue,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

import { AnimatedBox } from '@components/ui/Box/Box';

const ProgressIndicator: FC<{
    count?: number;
    itemWidth?: number;
    itemHeight?: number;
    duration?: number;
    itemsOffset?: number;
    topScale?: number;
}> = ({
    count = 8,
    itemWidth = 16,
    itemHeight = 4,
    duration = 5000,
    itemsOffset = 4,
    topScale = 4,
}) => {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(withTiming(1, { duration }), -1, true);
    }, []);

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: itemHeight * topScale,
                width: (itemWidth + itemsOffset) * count,
            }}
        >
            {[...Array(count)].map((x, index) => (
                <ProgressItem
                    key={`progressItem${index}`}
                    index={index}
                    width={itemWidth}
                    height={itemHeight}
                    count={count}
                    topScale={topScale}
                    progress={progress}
                />
            ))}
        </View>
    );
};

const ProgressItem: FC<{
    index: number;
    count: number;
    width: number;
    height: number;
    topScale: number;
    progress: SharedValue<number>;
}> = ({ index, width, height, count, topScale, progress }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const parts = 3;
        const wholeCount = count - 1 + 2 * parts;
        const scaleY = interpolate(
            progress.value,
            [index / wholeCount, (index + parts) / wholeCount, (index + 2 * parts) / wholeCount],
            [1, topScale, 1],
            Extrapolation.CLAMP
        );
        return {
            transform: [{ scaleY }],
        };
    });
    return (
        <AnimatedBox
            width={width}
            height={height}
            backgroundColor="text_primary"
            style={animatedStyle}
        />
    );
};

export { ProgressIndicator };

/*
export function AlarmOverviewLoading({ visible }: { visible: boolean }) {
    if (!visible) {
        return null;
    }
    return (
        <Stack alignItems="center" justifyContent="center" gap="xs" flex={1}>
            <Text
                color="text_secondary"
                variant="caption_1_bold"
                textAlign="center"
                style={{ letterSpacing: 3 }}
            >
                UPDATING AlarmModel
            </Text>
            <ProgressIndicator
                duration={1000}
                itemWidth={16}
                itemHeight={8}
                itemsOffset={4}
                topScale={4}
            />
        </Stack>
    );
}


export default function LoadingIndicator({ visible }: { visible: boolean }) {
    if (!visible) {
        return null;
    }
    return (
        <View style={styles.container}>
            <ProgressIndicator
                duration={1000}
                itemWidth={16}
                itemHeight={8}
                itemsOffset={4}
                topScale={4}
            />
        </View>
    );
}
 */
