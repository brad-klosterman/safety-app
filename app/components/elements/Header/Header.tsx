import { Header as NavigationHeader, StackHeaderProps } from '@react-navigation/stack';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

import { Box, Text } from '@components/ui';
import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';

/**
 * Screen Header
 * ---
 * @param props
 */

function Header(props: StackHeaderProps) {
    return (
        <>
            <NavigationHeader {...props} />
            {props.options.title && (
                <Box
                    paddingHorizontal="m"
                    paddingBottom="none"
                    justifyContent={
                        props.options.headerTitleAlign === 'center' ? 'center' : 'flex-start'
                    }
                >
                    <Text
                        variant="large_title_bold"
                        textAlign={props.options.headerTitleAlign}
                    >
                        {props.options.title}
                    </Text>
                </Box>
            )}
        </>
    );
}

Header.Left = HeaderLeft;
Header.Right = HeaderRight;

export { Header };
