import React, { memo, useMemo } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import {
    Canvas,
    Circle,
    Group,
    LinearGradient,
    Rect,
    Shadow,
    mix,
    runTiming,
    useComputedValue,
    useValue,
    vec,
} from '@shopify/react-native-skia';

import { usePaint } from '@utils';
import { Box, Stack, Text } from '@components/ui';
import { styled } from '@theme';

const COLORS = {
    light: {
        overlay: ['rgba(233, 237, 244, 0.9)', 'rgba(251, 252, 253, 0.4)'],
        1: ['rgba(198, 208, 225, 0.4)', 'rgba(254,254,254, 0.6)'],
        3: ['rgba(255,255,255,1)', 'rgba(198, 208, 225, 1)'],
        4: ['rgba(198, 208, 225, 1)', 'rgba(243, 246, 249, 1)'], // inner circle
        pressed: [217, 200],
        center_shine: 'rgba(250, 250, 250, 0.62)',
    },
    dark: {
        overlay: ['rgba(26, 26, 26, 0.8)', 'rgba(26, 26, 26, 0.8)'],
        1: ['rgba(26, 26, 26, 1)', 'rgba(32, 32, 32, 1)'],
        3: ['rgba(44, 48, 48, 1)', 'rgba(26, 26, 27, 1)'],
        4: ['rgba(26, 26, 26, 1)', 'rgba(51, 51, 51, 1)'],
        pressed: [26, 36],
        center_shine: 'rgba(0, 0, 0, 0.62)',
    },
};

const AlarmPanicButton = memo(
    ({
        pressTriggerAlarm,
        locations_granted,
        theme_variant,
    }: {
        pressTriggerAlarm(): void;
        locations_granted: boolean;
        theme_variant: 'light' | 'dark';
    }) => {
        const { width: screen_width, height: screen_height } = useWindowDimensions();
        //const navbar_height = Navbar.useHeight();

        const graph = useMemo(() => {
            const container_height = screen_height - 72;
            const diameter = screen_width - 48;
            const center = vec(screen_width / 2, container_height / 2);

            return {
                center,
                1: ((radius) => ({
                    start: vec(center.x, center.y - radius),
                    end: vec(center.x, center.y + radius),
                    radius,
                    colors: COLORS[theme_variant][1],
                }))(diameter / 2),
                2: ((radius) => ({
                    start: vec(center.x, center.y - radius),
                    end: vec(center.x, center.y + radius),
                    radius,
                    colors: [
                        'rgba(159, 36, 21, 1)',
                        'rgba(152, 34, 20, 1)',
                        'rgba(159, 36, 21, 1)',
                    ],
                }))((diameter - 32) / 2),
                3: ((radius) => ({
                    start: vec(center.x, center.y - radius),
                    end: vec(center.x, center.y + radius),
                    colors: COLORS[theme_variant][3],
                    radius,
                }))((diameter - 46) / 2),
                4: ((radius) => ({
                    start: vec(center.x, center.y - radius),
                    end: vec(center.x, center.y + radius),
                    radius,
                    colors: COLORS[theme_variant][4],
                }))((diameter - 80) / 2),
            };
        }, [screen_height, screen_width, theme_variant]);

        const paint = usePaint();

        const pressed = useValue(0);
        const onPressStart = () => {
            runTiming(pressed, pressed.current ? 0 : 1, { duration: 150 });
        };

        const onPressEnd = () => {
            pressTriggerAlarm();
            runTiming(pressed, pressed.current ? 0 : 1, { duration: 150 });
        };

        const radius_animation_outer = useComputedValue(
            () => mix(pressed.current, graph[3].radius, graph[3].radius - 2),
            [pressed, theme_variant]
        );

        const radius_animation = useComputedValue(
            () => mix(pressed.current, graph[4].radius, graph[4].radius - 1),
            [pressed, theme_variant]
        );

        const styles = useStyles();

        return (
            <Box
                width={screen_width}
                height={screen_height}
            >
                {!locations_granted && (
                    <Box style={styles.warning_text}>
                        <Text color="danger">Location services are disabled</Text>
                    </Box>
                )}
                <Canvas style={styles.canvas}>
                    <Group opacity={0.95}>
                        <Rect
                            x={0}
                            y={0}
                            width={screen_width}
                            height={screen_height}
                        >
                            <LinearGradient
                                start={vec(screen_width / 2, 0)}
                                end={vec(screen_width / 2, screen_height)}
                                colors={COLORS[theme_variant].overlay}
                            />
                            {/*<SweepGradient*/}
                            {/*    c={vec(screen_width / 2, screen_height / 2)}*/}
                            {/*    colors={COLORS[contrast_mode].overlay}*/}
                            {/*/>*/}
                            {/*<BlurMask blur={rSkia} style="solid" />*/}
                        </Rect>
                    </Group>
                    <Group>
                        {/* OUTSIDE CIRCLE (1) */}
                        <Group>
                            <Circle
                                cx={graph.center.x}
                                cy={graph.center.y}
                                r={graph[1].radius}
                            >
                                <LinearGradient
                                    start={graph[1].start}
                                    end={graph[1].end}
                                    colors={graph[1].colors}
                                />
                            </Circle>
                            {/*<Shadow dx={0} dy={1} blur={1} color="rgba(0, 0, 0, 0.28)" inner />*/}
                        </Group>
                        {/* PROGRESS CIRCLE (2) */}
                        <Group layer={paint}>
                            <LinearGradient
                                start={graph[2].start}
                                end={graph[2].end}
                                colors={graph[2].colors}
                            />
                            <Circle
                                c={graph.center}
                                r={graph[2].radius}
                                origin={graph.center}
                            />
                            <Shadow
                                dx={0}
                                dy={1}
                                blur={2}
                                color="rgba(0, 0, 0, 0.28)"
                                inner
                            />
                        </Group>
                        {/* RAISED RIM CIRCLE (3) */}
                        <Group layer={paint}>
                            <LinearGradient
                                start={graph[3].start}
                                end={graph[3].end}
                                // colors={gradiant_animation}
                                colors={graph[3].colors}
                            />
                            <Circle
                                c={graph.center}
                                r={radius_animation_outer}
                                origin={graph.center}
                            />
                            <Shadow
                                dx={0}
                                dy={1}
                                blur={2}
                                color="rgba(0, 0, 0, 0.28)"
                            />
                        </Group>
                        {/* CENTER CIRCLE (4) */}
                        <Group layer={paint}>
                            <LinearGradient
                                start={graph[4].start}
                                end={graph[4].end}
                                colors={graph[4].colors}
                                // colors={gradiant_center_animation}
                            />
                            <Circle
                                c={graph.center}
                                r={radius_animation}
                                origin={graph.center}
                            />
                            <Shadow
                                dx={0}
                                dy={-1}
                                blur={0}
                                color={COLORS[theme_variant].center_shine}
                                inner
                            />
                        </Group>
                    </Group>
                </Canvas>

                <Pressable
                    onTouchStart={onPressStart}
                    onTouchEnd={onPressEnd}
                    style={[
                        styles.button_box,
                        {
                            width: graph[1].radius * 2,
                            height: graph[1].radius * 2,
                            transform: [
                                { translateX: graph.center.x - graph[1].radius },
                                { translateY: graph[1].start.y },
                            ],
                        },
                    ]}
                >
                    <Stack>
                        <Box>
                            <Text style={styles.panic_text_2}>PRESS</Text>
                            <Text style={styles.panic_text}>SOS ALARM</Text>
                        </Box>
                    </Stack>
                </Pressable>
            </Box>
        );
    }
);

const useStyles = styled((theme) => ({
    warning_text: {
        position: 'absolute',
        left: 24,
        top: 100,
    },
    canvas: {
        flex: 1,
    },
    button_box: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    panic_text: {
        fontFamily: 'Inter_700Bold',
        fontWeight: '700',
        fontSize: 26,
        lineHeight: 26,
        letterSpacing: 2,
        textAlign: 'center',
        color: 'rgba(159, 36, 21, 1)',
    },
    panic_text_2: {
        fontFamily: 'Inter_700Bold',
        fontWeight: '700',
        fontSize: 54,
        lineHeight: 54,
        letterSpacing: 1,
        textAlign: 'center',
        color: 'rgba(159, 36, 21, 1)',
    },
}));

export { AlarmPanicButton };

/*

const gradiant_center_animation = useComputedValue(() => {
            const top = mix(
                pressed.current,
                COLORS[theme_variant].pressed[0],
                COLORS[theme_variant].pressed[1]
            );
            return [`rgba(${top}, ${top}, ${top}, 1)`, COLORS[theme_variant][4][1]]; //top bottom
        }, [pressed, theme_variant]);
 */
