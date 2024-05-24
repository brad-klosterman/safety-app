import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { AnimatedBox, Box, Stack, Flex, Text, Icon as IconComponent } from '@components/ui';
import type { ActionItemProps } from './types';

export const MENU_ITEM_HEIGHT = 57;
export const MENU_SPRING_CONFIGURATION = {
    damping: 33,
    mass: 1.03,
    stiffness: 500,
    restDisplacementThreshold: 0.001,
    restSpeedThreshold: 0.001,
};

/**
 * ActionSheet Item
 * ---
 **/
const ActionItem = ({ position, label, value, onPress, type, children, icon }: ActionItemProps) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const scaledRow = useAnimatedStyle(() => {
        return {
            perspective: 200,
            transform: [
                {
                    scale: scale.value,
                },
            ],
            opacity: opacity.value,
        };
    }, [scale.value, opacity.value]);

    const onPressStart = () => {
        scale.value = withSpring(0.95, MENU_SPRING_CONFIGURATION);
        opacity.value = withSpring(0.95, MENU_SPRING_CONFIGURATION);
        onPress && onPress();
    };

    const onPressEnd = () => {
        scale.value = withSpring(1, MENU_SPRING_CONFIGURATION);
        opacity.value = withSpring(1, MENU_SPRING_CONFIGURATION);
    };

    const Icon = useMemo(() => icon && IconComponent[icon], [icon]);

    return (
        <Stack
            //direction="column"
            paddingHorizontal="m"
            borderBottomWidth={position !== 'bottom' && position !== 'single' ? 1 : 0}
            style={styles.menu_item}
            borderColor="menu_border"
        >
            <>
                {(() => {
                    switch (type) {
                        case 'nav':
                            return (
                                <Pressable
                                    onPressIn={onPressStart}
                                    onPressOut={onPressEnd}
                                >
                                    <AnimatedBox
                                        style={[scaledRow]}
                                        flexDirection="row"
                                        alignItems="center"
                                    >
                                        <Box
                                            alignItems="center"
                                            flex={1}
                                            flexDirection="row"
                                        >
                                            {Icon && (
                                                <Box marginRight="m">
                                                    <Icon
                                                        size={18}
                                                        color="text_primary"
                                                    />
                                                </Box>
                                            )}
                                            {label && <Text variant="body">{label}</Text>}
                                        </Box>
                                        <IconComponent.MenuArrowRight
                                            size={17}
                                            color="menu_border"
                                        />
                                    </AnimatedBox>
                                </Pressable>
                            );
                        case 'nav_input':
                            return (
                                <Pressable
                                    onPressIn={onPressStart}
                                    onPressOut={onPressEnd}
                                >
                                    <AnimatedBox
                                        style={[scaledRow, { alignItems: 'center' }]}
                                        flexDirection="row"
                                        alignItems="center"
                                    >
                                        <Flex flex={1}>
                                            <Text
                                                color="text_label"
                                                style={{ fontSize: 12, lineHeight: 16 }}
                                            >
                                                {label}
                                            </Text>
                                            <Text style={styles.value_text}>{value}</Text>
                                        </Flex>
                                        <IconComponent.MenuArrowRight
                                            size={17}
                                            color="text_tertiary"
                                        />
                                    </AnimatedBox>
                                </Pressable>
                            );
                        case 'input':
                            return children;
                        case 'info':
                            return (
                                <Flex
                                    gap="s"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Text variant="body">{label}</Text>
                                    {value && (
                                        <Text
                                            variant="body"
                                            color="text_secondary"
                                        >
                                            {value}
                                        </Text>
                                    )}
                                </Flex>
                            );
                        default:
                            return children;
                    }
                })()}
            </>
        </Stack>
    );
};

export { ActionItem };

const styles = StyleSheet.create({
    menu_item: {
        height: MENU_ITEM_HEIGHT,
        justifyContent: 'center',
        position: 'relative',
    },
    value_text: {
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.408,
    },
});
