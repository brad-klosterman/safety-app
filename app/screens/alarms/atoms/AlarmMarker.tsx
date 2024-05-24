import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const Ring = ({ delay }: { delay: number }) => {
    const ring = useSharedValue(0);

    const ringStyle = useAnimatedStyle(() => {
        return {
            opacity: 0.8 - ring.value,
            transform: [
                {
                    scale: interpolate(ring.value, [0, 1], [0, 4]),
                },
            ],
        };
    });
    useEffect(() => {
        ring.value = withDelay(
            delay,
            withRepeat(
                withTiming(1, {
                    duration: 2000,
                }),
                -1,
                false
            )
        );
    }, []);
    return <Animated.View style={[styles.ring, ringStyle]} />;
};

function AlarmMarker({ is_active_alarm }: { is_active_alarm: boolean }) {
    return (
        <Animated.View style={styles.marker_wrap}>
            <View style={styles.marker_dot_border} />
            <View style={styles.marker_dot} />

            {is_active_alarm && (
                <>
                    <Ring delay={0} />
                    <Ring delay={1000} />
                </>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    marker_wrap: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    marker_dot: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: '#EE1C25',
        position: 'absolute',
    },
    marker_dot_border: {
        width: 30,
        height: 30,
        borderColor: '#EE1C25',
        borderWidth: 2,
        borderRadius: 30,
        position: 'absolute',
    },
    ring: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#EE1C25',
        borderWidth: 20,
    },
});

export { AlarmMarker };
