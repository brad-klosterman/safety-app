import { FlashListProps } from '@shopify/flash-list';
import React from 'react';
import { Control, FieldValues, Path, UseControllerProps } from 'react-hook-form';

import Animated, { SharedValue } from 'react-native-reanimated';

export type ControlledSelectorProps<
    Field extends FieldValues,
    FieldValue extends SelectorValue
> = UseControllerProps<Field> & {
    control: Control<Field>;
    label: string;
    items: SelectorOption<FieldValue>[];
    onChange?: (name: Path<Field>) => void;
    type?: SelectorType;
    visible_items?: number;
    small_font?: true;
    editable?: boolean;
};

export type SelectorType = 'wheel' | 'radio';

/**
 * Selector List
 *
 */

export type AnimatedFlashListType<ItemT> = React.ComponentProps<
    React.ComponentClass<Animated.AnimateProps<FlashListProps<ItemT>>, any>
>;

export type SelectorContext = {
    container: SelectorContainerLayout;
    item: SelectorItemLayout;
    highlight: SelectorHighlightLayout;
    data: SelectorDataItem<SelectorValue>[];
};

export interface SelectorContainerLayout {
    width: number;
    height: number;
    offset_height: number;
    offset_number: number;
}

export interface SelectorItemLayout {
    width?: number;
    height: number;
}

export interface SelectorHighlightLayout {
    top: number;
    height: number;
}

/**
 * Selector Item
 *
 */

export type SelectorValue = string | number | null;

export interface SelectorOption<T extends SelectorValue> {
    label: string;
    value: T;
}

export interface SelectorDataItem<T extends SelectorValue> {
    index: number;
    option: SelectorOption<T>;
    layout: SelectorItemLayout & {
        offset_height: number;
    };
    input_range: [number, number, number];
}

export interface SelectorItemProps<T extends SelectorValue> extends SelectorDataItem<T> {
    translateY: SharedValue<number>;
    small_font?: boolean;
}

export interface SelectorOutputRanges {
    scale: number[];
    rotation: number[];
    opacity: number[];
}

// if prop type then change required props
