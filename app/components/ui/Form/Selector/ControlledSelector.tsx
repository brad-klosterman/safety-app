import { InputBase } from '@components/ui/Form/Input/input.base';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import ReactNative, {
    Pressable,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@components/ui/Button/Button';
import { Box, Row, Stack } from '@components/ui/Box';

import { AnimatedText, Text } from '@components/ui/Text/Text';
import { useInputAnimation } from '@components/ui/Form/Input/animation';

import { styled } from '@theme';
import { isAndroid, isIOS, SCREEN_WIDTH } from '@device';

import {
    DEFAULT_SELECTOR_HIGHLIGHT_PROPS,
    SELECTOR_ITEM_HEIGHT,
    SELECTOR_VIEWABILITY_CONFIG,
} from './config';

import {
    ControlledSelectorProps,
    SelectorContainerLayout,
    SelectorContext,
    SelectorDataItem,
    SelectorHighlightLayout,
    SelectorItemLayout,
    SelectorValue,
} from './types';
import WheelItem from './wheel.item';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList) as React.ComponentClass<
    Animated.AnimateProps<FlashListProps<any>>,
    unknown
>;

export function ControlledSelector<Field extends FieldValues, FieldValue extends SelectorValue>({
    name,
    label,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    items,
    visible_items = 5,
    onChange,
    editable = true,
    small_font,
    ...input_props
}: ControlledSelectorProps<Field, FieldValue>) {
    const styles = useStyles();
    const insets = useSafeAreaInsets();

    const {
        field: { value, onChange: onChangeField, onBlur },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
        defaultValue,
        shouldUnregister,
    });
    const input_ref = useRef<TextInput | null>();
    const animated_input = useInputAnimation({ value });

    const flashlist_ref = useAnimatedRef<FlashList<SelectorDataItem<FieldValue>>>();

    const context = useMemo<SelectorContext>(() => {
        const offset_number = Math.floor(visible_items / 2);

        const item: SelectorItemLayout = {
            height: SELECTOR_ITEM_HEIGHT,
        };

        const container: SelectorContainerLayout = {
            width: SCREEN_WIDTH,
            height: visible_items * item.height,
            offset_number,
            offset_height: offset_number * item.height,
        };

        const highlight: SelectorHighlightLayout = {
            ...DEFAULT_SELECTOR_HIGHLIGHT_PROPS,
            top: container.offset_height,
            height: item.height,
        };

        const offset_option = new Array(offset_number)
            .fill(0)
            .map((_, i) => ({ value: `offset${i}`, label: '' }));

        const options = [...offset_option, ...items, ...offset_option];

        const data: SelectorContext['data'] = options.map((option, index) => {
            const offset_height = item.height * index - container.offset_height;

            const radius = container.offset_height / offset_number;

            return {
                index,
                option,
                layout: {
                    ...item,
                    offset_height,
                },
                input_range: [
                    offset_height - container.offset_height - radius,
                    offset_height,
                    offset_height + container.offset_height + radius,
                ],
            };
        });

        return {
            container,
            item,
            highlight,
            data,
        };
    }, []);

    const translateY = useSharedValue(0);
    const current_index = useSharedValue(0);
    useAnimatedReaction(
        () => current_index.value,
        () => isIOS && runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light)
    );

    const scrollHandler = useAnimatedScrollHandler((event) => {
        if (event.contentOffset?.y) {
            const index = Math.round(event.contentOffset.y / context.item.height);
            translateY.value = event.contentOffset.y;
            current_index.value = index;
        }
    });

    const getSelectedItem = (field_value: SelectorValue): SelectorDataItem<SelectorValue> | null =>
        context.data.find((item) => item.option.value === field_value) || null;

    const [selected_item, setSelectedItem] = useState<SelectorDataItem<SelectorValue> | null>(
        getSelectedItem(value)
    );

    const [modal_open, setModalOpen] = useState(false);

    const onFocusHandler = () => {
        setModalOpen(true);
        animated_input.onFocus();
        input_ref?.current && input_ref.current.focus();
    };

    const onBlurHandler = () => {
        setModalOpen(false);
        animated_input.onBlur();
        input_ref?.current && input_ref.current.blur();
    };

    const onPressCancel = () => {
        setModalOpen(false);
    };

    const onPressSave = async () => {
        const index =
            Math.round(translateY.value / context.item.height) + context.container.offset_number;
        const item = context.data[index];
        setSelectedItem(item);
        // @ts-ignore
        onChangeField(item.option.value);
        setModalOpen(false);
    };

    const key_extractor = useCallback(
        (item: SelectorDataItem<FieldValue>, index: number) => `${index}`,
        []
    );

    const renderItem = useCallback(
        ({ item }: { item: SelectorDataItem<FieldValue> }) => (
            <WheelItem
                {...item}
                translateY={translateY}
                small_font={small_font}
            />
        ),
        []
    );

    return (
        <>
            <Stack style={styles.input_container}>
                <Pressable
                    onPress={editable ? () => setModalOpen(true) : null}
                    style={styles.input_container_overlay}
                >
                    <View style={styles.input_container_overlay} />
                </Pressable>
                <AnimatedText
                    color={error ? 'text_danger' : 'text_label'}
                    style={animated_input.styles}
                >
                    {label}
                </AnimatedText>
                <InputBase
                    {...input_props}
                    ref={(e: TextInput) => {
                        input_ref.current = e;
                    }}
                    value={selected_item?.option.label}
                    onChangeText={() => null}
                    onBlur={onBlur}
                    // TODO: listen to contrast mode
                    keyboardAppearance="dark"
                    underlineColorAndroid="transparent"
                />
            </Stack>

            <ReactNative.Modal
                animationType="slide"
                transparent={true}
                visible={modal_open}
                statusBarTranslucent={true}
                presentationStyle="overFullScreen"
                // onRequestClose={() => closeModal()}
            >
                <TouchableWithoutFeedback
                    testID="dialog-backdrop"
                    onPress={() => setModalOpen(false)}
                >
                    <View style={[StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>
                <SafeAreaView
                    pointerEvents="box-none"
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                        backgroundColor: 'transparent',
                    }}
                >
                    <Stack
                        style={styles.modal}
                        backgroundColor="background_elevated_primary"
                    >
                        <Row
                            justifyContent="center"
                            backgroundColor="background_elevated_primary"
                        >
                            <Box
                                flex={1}
                                alignItems="flex-start"
                                paddingHorizontal="m"
                            >
                                <Button
                                    variant="ghost_danger"
                                    onPress={onPressCancel}
                                >
                                    Cancel
                                </Button>
                            </Box>
                            <Box
                                flex={2}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text
                                    variant="headline_bold"
                                    textAlign="center"
                                >
                                    {label}
                                </Text>
                            </Box>
                            <Box
                                flex={1}
                                alignItems="flex-end"
                                paddingHorizontal="m"
                            >
                                <Button
                                    variant="ghost_primary"
                                    onPress={onPressSave}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Row>
                        <Box
                            style={{ height: insets.bottom / 2, width: '100%' }}
                            backgroundColor="background_elevated_secondary"
                        />
                        <Box
                            height={context.container.height}
                            width={context.container.width}
                            backgroundColor="background_elevated_secondary"
                        >
                            <Box {...context.highlight} />
                            <AnimatedFlashList
                                ref={flashlist_ref}
                                testID={`${label}.selector`}
                                keyExtractor={key_extractor}
                                data={context.data}
                                renderItem={renderItem}
                                snapToInterval={context.item.height}
                                estimatedItemSize={context.item.height}
                                onScroll={scrollHandler}
                                initialScrollIndex={
                                    selected_item
                                        ? selected_item?.index - context.container.offset_number
                                        : 0
                                }
                                scrollEventThrottle={16}
                                decelerationRate={isAndroid ? 0.98 : 'normal'}
                                estimatedListSize={{
                                    height: context.container.height,
                                    width: context.container.width,
                                }}
                                viewabilityConfig={SELECTOR_VIEWABILITY_CONFIG}
                            />
                        </Box>
                        <Box
                            style={{ height: insets.bottom, width: '100%' }}
                            backgroundColor="background_primary"
                        />
                    </Stack>
                </SafeAreaView>
            </ReactNative.Modal>
        </>
    );
}

const useStyles = styled((theme) => ({
    background: {
        flex: 1,
    },
    outer_container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    input_container: {
        flex: 1,
        justifyContent: 'center',
    },
    input_container_overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9,
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        width: SCREEN_WIDTH,
        backgroundColor: theme.colors.modal,
    },
    value_text: {
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: -0.408,
    },
}));
