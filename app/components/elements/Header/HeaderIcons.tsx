import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import Svg, { Path } from 'react-native-svg';
import Theme from '@theme';

function HeaderBackArrow() {
    const ThemeContext = Theme.useContext();
    const { theme } = ThemeContext;

    return (
        <Svg
            width="12"
            height="21"
            viewBox="0 0 12 21"
        >
            <Path
                d="M9.53714 20.5827L0.292152 11.4458C-0.097384 11.0612 -0.097384 10.4398 0.292152 10.0542L9.53714 0.917333C10.0995 0.360889 11.0144 0.360889 11.5777 0.917333C12.14 1.47378 12.14 2.37687 11.5777 2.93332L3.66913 10.7505L11.5777 18.5657C12.14 19.1231 12.14 20.0262 11.5777 20.5827C11.0144 21.1391 10.0995 21.1391 9.53714 20.5827Z"
                fill={theme.colors.text_emphasis}
            />
        </Svg>
    );
}

function HeaderNextArrow() {
    const ThemeContext = Theme.useContext();
    const { theme } = ThemeContext;

    return (
        <Svg
            width="12"
            height="21"
            viewBox="0 0 12 21"
        >
            <Path
                d="M2.46287 0.417333L11.7078 9.5542C12.0974 9.93881 12.0974 10.5602 11.7078 10.9458L2.46286 20.0827C1.90053 20.6391 0.985625 20.6391 0.422297 20.0827C-0.140033 19.5262 -0.140033 18.6231 0.422297 18.0667L8.33087 10.2495L0.422298 2.43432C-0.140032 1.87687 -0.140032 0.973776 0.422298 0.417333C0.985627 -0.139111 1.90054 -0.139111 2.46287 0.417333"
                fill={theme.colors.text_emphasis}
            />
        </Svg>
    );
}

export { HeaderBackArrow, HeaderNextArrow };
