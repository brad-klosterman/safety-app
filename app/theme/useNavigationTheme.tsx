import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ThemeModel, NavigationTheme } from './type.Theme';

const NAVBAR_HEIGHT = 72;
const NAVBAR_BORDER_RADIUS = 12;

/**
 * useNavigationTheme
 * @param props.theme
 */
function useNavigationTheme(props: { theme: ThemeModel }) {
    const color = props.theme.colors;

    const insets = useSafeAreaInsets();
    const navbar_height = NAVBAR_HEIGHT + insets.bottom;

    return React.useMemo<NavigationTheme>(
        () => ({
            navbar: {
                options: {
                    tabBarStyle: {
                        height: navbar_height,
                        display: 'flex',
                        position: 'absolute',
                        bottom: 0,
                        borderTopLeftRadius: NAVBAR_BORDER_RADIUS,
                        borderTopRightRadius: NAVBAR_BORDER_RADIUS,
                        borderTopWidth: 0,
                        borderWidth: 0,
                        // shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.4,
                        shadowRadius: 1,
                        elevation: 8,
                    },
                    tabBarIconStyle: {
                        marginBottom: 4,
                    },
                    tabBarItemStyle: {
                        height: 52,
                        paddingBottom: 4,
                        marginTop: 20,
                    },
                    tabBarBadgeStyle: {
                        backgroundColor: color.danger,
                        marginTop: -4,
                        fontSize: 12,
                    },
                    tabBarActiveTintColor: color.text_secondary,
                    tabBarInactiveTintColor: color.text_tertiary,
                    tabBarHideOnKeyboard: true,
                },
                height: navbar_height,
            },
            container: {
                dark: false,
                colors: {
                    primary: color.text_primary,
                    border: color.line,
                    background: color.background_primary,
                    card: color.background_elevated_primary,
                    text: color.text_primary,
                    notification: color.background_elevated_primary,
                },
            },
        }),
        [color, navbar_height]
    );
}

export { useNavigationTheme };
