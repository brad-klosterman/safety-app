import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Flex, FlexProps, Text } from '@components/ui';

/**
 *   Screen View Component
 *   ---
 *
 *
 *
 */

function ScreenView(
    props: Pick<FlexProps, 'paddingHorizontal' | 'paddingVertical' | 'gap' | 'children'> & {
        /**
         * Function which returns a React Element to display on the left side of the header.
         */
        headerLeft?: (props: {
            tintColor?: string;
            pressColor?: string;
            pressOpacity?: number;
            labelVisible?: boolean;
            href?: undefined;
        }) => React.ReactNode;
        headerRight?: (props: {
            tintColor?: string;
            pressColor?: string;
            pressOpacity?: number;
            labelVisible?: boolean;
        }) => React.ReactNode;
        HeaderRight?: any;
        headline?: string;
    }
) {
    const navigation = useNavigation();

    const leftButton = props.headerLeft
        ? props.headerLeft({
              // tintColor: headerTintColor,
              // pressColor: headerPressColor,
              // pressOpacity: headerPressOpacity,
              // labelVisible: headerLeftLabelVisible,
          })
        : null;

    const rightButton = props.headerRight
        ? props.headerRight({
              // tintColor: headerTintColor,
          })
        : null;

    React.useLayoutEffect(() => {
        if (rightButton) {
            navigation.setOptions({
                //headerShown: false,
                headerRight: () => rightButton,
            });
        }
    }, [navigation, rightButton]);

    return (
        <View style={styles.container}>
            <Flex
                flex={1}
                direction="column"
                gap={props.gap || 's'}
                paddingHorizontal={props.paddingHorizontal || 'm'}
                paddingVertical={props.paddingVertical}
                backgroundColor="background_primary"
            >
                {props.headline && (
                    <Box marginBottom="s">
                        <Text
                            variant="headline"
                            color="text_secondary"
                        >
                            {props.headline}
                        </Text>
                    </Box>
                )}
                {props.children}
            </Flex>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});

export { ScreenView };

/*

====================================================================================================
 ‣ ScreenView Component
====================================================================================================

 Set Screen Options for route
const navigation = useNavigation();

 {use_navbar_spacer && <NavbarSpacer />}

 const ScreenContent = ({
    paddingHorizontal = 'm',
    children,
    use_navbar_spacer = false,
    // use_safe_area_top = false,
    ...rootProps
}: StackProps & { use_navbar_spacer?: boolean; use_safe_area_top?: boolean }) => {
    return (
        <Stack
            flex={1}
            paddingHorizontal={paddingHorizontal}
            {...rootProps}
            backgroundColor="background_primary"
        >
            {children}
            {use_navbar_spacer && <NavbarSpacer />}
        </Stack>
    );
};

*/
