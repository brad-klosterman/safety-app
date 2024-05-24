import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackHeaderProps, StackNavigationOptions } from '@react-navigation/stack';

import { Header } from './Header';

const useHeaderOptions = (): StackNavigationOptions => {
    const insets = useSafeAreaInsets();

    return {
        header: (props: StackHeaderProps) => <Header {...props} />,
        // headerBackImage: () => <AppbarBack padding={isIOS} />,
        headerLeft: (props) => (
            <Header.Left
                {...props}
                renderIcon="back"
            />
        ),
        headerTintColor: 'transparent',
        headerPressColor: 'transparent',
        headerTitle: () => null,
        headerShadowVisible: false,
        //labelVisible: false,
        headerStyle: {
            //position: 'absolute', //  position: 'absolute' is not supported on headerStyle. If you would like to render content under the header, use the 'headerTransparent' option.
            height: insets.top + 64,
            backgroundColor: 'transparent',
        },

        // headerMode: 'screen', // Stack Navigator: 'headerMode' is moved to 'options'. Moved it to 'screenOptions' to keep current behavior.
    };
};

export { useHeaderOptions };
