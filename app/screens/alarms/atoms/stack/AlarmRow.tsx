import { Feather } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Box, Stack, Text } from '@components/ui';
import { type AlarmsType } from '@state';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const animation_config = {
    duration: 150,
    easing: Easing.linear,
};

const AlarmRow = (props: { alarm: AlarmsType.AlarmsStackRow; openAlarm(): void }) => {
    const alarm = props.alarm;

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
        scale.value = withTiming(0.95, animation_config);
        opacity.value = withTiming(0.95, animation_config);
        props.openAlarm();
    };

    const onPressEnd = () => {
        scale.value = withTiming(1, animation_config);
        opacity.value = withTiming(1, animation_config);
    };

    return (
        <Box
            backgroundColor="background_primary"
            borderColor="menu_border"
            borderBottomWidth={2}
        >
            <AnimatedPressable
                key={alarm.id}
                style={[scaledRow]}
                onPress={onPressStart}
                onPressOut={onPressEnd}
            >
                <Box flexDirection="row">
                    <Stack
                        flex={1}
                        padding="m"
                    >
                        <Text
                            color="text_secondary"
                            variant="footnote_bold"
                        >
                            {alarm.updated_at}
                        </Text>
                        <Stack paddingVertical="m">
                            <Text variant="callout_bold">{alarm.alarm_type}</Text>
                            <Text
                                variant="footnote"
                                numberOfLines={2}
                                ellipsizeMode="middle"
                            >
                                {alarm.address}
                            </Text>
                        </Stack>
                        <Box
                            paddingTop="xs"
                            alignItems="flex-start"
                        >
                            <Box
                                paddingVertical="xs"
                                paddingHorizontal="m"
                                borderWidth={1}
                                backgroundColor={
                                    alarm.is_active
                                        ? alarm.non_emergency
                                            ? 'pill_warning_background'
                                            : 'pill_danger_background'
                                        : 'pill_success_background'
                                }
                                borderColor={
                                    alarm.is_active
                                        ? alarm.non_emergency
                                            ? 'pill_warning'
                                            : 'pill_danger'
                                        : 'pill_success'
                                }
                                borderRadius="full"
                            >
                                <Text
                                    color={
                                        alarm.is_active
                                            ? alarm.non_emergency
                                                ? 'pill_warning'
                                                : 'pill_danger'
                                            : 'pill_success'
                                    }
                                    variant="footnote_bold"
                                >
                                    {alarm.is_active && alarm.non_emergency
                                        ? 'TO ACKNOWLEDGE'
                                        : alarm.state}
                                </Text>
                            </Box>
                        </Box>
                    </Stack>
                    <Box
                        justifyContent="center"
                        padding="s"
                    >
                        <Feather
                            name="chevron-right"
                            size={24}
                            color="#B1B9BF"
                        />
                    </Box>
                </Box>
            </AnimatedPressable>
        </Box>
    );
};

export { AlarmRow };
