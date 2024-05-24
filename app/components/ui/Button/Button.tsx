import React, { ComponentProps } from 'react';
import { VariantProps, createRestyleComponent, createVariant, useTheme } from '@shopify/restyle';

import type { ThemeModel, ThemeColor } from '@theme';
import { Text } from '@components/ui/Text/Text';
import { Box } from '@components/ui/Box/Box';
import { PressableOpacity } from './PressableOpacity';
import type { ButtonProps } from './types';

/** Styled Button Container */

const Container = createRestyleComponent<
    VariantProps<ThemeModel, 'buttonVariants'> & ComponentProps<typeof Box>,
    ThemeModel
>([createVariant({ themeKey: 'buttonVariants' })], Box);

/** Button Component */

const Button = ({ variant = 'primary', children, fit_width = false, ...rest }: ButtonProps) => {
    // todo get the color property for variant for text
    //const theme = useTheme<ThemeModel>();
    // const text_color = theme.buttonVariants[variant as keyof ThemeType.ThemeModel['buttonVariants']]
    //     .color as keyof ThemeType.ThemeModel['colors'];

    return (
        <PressableOpacity
            {...rest}
            style={{ flex: fit_width ? 1 : undefined }}
        >
            <Container variant={variant}>
                <Text
                    variant="button"
                    //color={text_color}
                >
                    {children}
                </Text>
            </Container>
        </PressableOpacity>
    );
};

export { Button };
