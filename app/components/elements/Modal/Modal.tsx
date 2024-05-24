import React, { ReactNode, memo, useEffect } from 'react';
import ReactNative, { StyleSheet } from 'react-native';
import {
    Easing,
    WithTimingConfig,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { HeaderLeft } from '@components/elements/Header/HeaderLeft';
import { HeaderRight, type HeaderRightProps } from '@components/elements/Header/HeaderRight';
import { AnimatedBox, Row, Stack } from '@components/ui';

const animation_config: WithTimingConfig = {
    duration: 550,
    easing: Easing.linear,
};

const Modal = memo(
    ({
        visible,
        children,
        without_route = false,
        onPressClose,
        header_right,
    }: {
        visible: boolean;
        children: ReactNode;
        without_route?: boolean;
        header_right?: HeaderRightProps;
        onPressClose?(): void;
    }) => {
        const opacity = useSharedValue(0);
        const animated_styles = useAnimatedStyle(
            () => ({
                backgroundColor: `rgba(0,0,0,${opacity.value})`,
            }),
            [opacity.value]
        );

        useEffect(() => {
            if (visible) {
                opacity.value = withTiming(0.8, animation_config);
            } else {
                opacity.value = 0;
            }
        }, [opacity, visible]);

        const onClose = () => {
            opacity.value = 0;
            onPressClose?.();
        };

        return (
            <ReactNative.Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                statusBarTranslucent={true}
            >
                <AnimatedBox style={[styles.overlay, animated_styles]} />
                <Stack
                    flex={1}
                    backgroundColor="background_primary"
                    borderTopRightRadius="xl"
                    borderTopLeftRadius="xl"
                    marginTop="xl"
                >
                    {onPressClose && (
                        <Row
                            paddingVertical="m"
                            justifyContent="space-between"
                        >
                            <HeaderLeft onPress={onClose} />
                            {header_right && <HeaderRight {...header_right} />}
                            {/*{without_route ? (*/}
                            {/*    <HeaderLeft onPress={onClose} />*/}
                            {/*) : (*/}
                            {/*    <>*/}
                            {/*        <AppbarLeft onPress={onClose} />*/}
                            {/*        {header_right && <AppbarRight {...header_right} />}*/}
                            {/*    </>*/}
                            {/*)}*/}
                        </Row>
                    )}
                    {children}
                </Stack>
            </ReactNative.Modal>
        );
    }
);

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
});

export { Modal };
