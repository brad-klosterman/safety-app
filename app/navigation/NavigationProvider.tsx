import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// import { createContextProvider } from '@utils';
import Theme from '@theme';

/**
 *   Navigation Provider
 *   ---
 *
 *
 */

//const [NavigationContext, useNavigationContext] = createContextProvider<null>();

function NavigationProvider(props: { children: React.ReactNode }) {
    const ThemeContext = Theme.useContext();

    /**
     * Router Screen Options
     **/
    // const header_options = useHeaderOptions();
    // const screenOptions: StackNavigationOptions = {
    //     gestureEnabled: false,
    //     ...header_options,
    //     ...TransitionPresets.SlideFromRightIOS,
    // };

    return (
        <NavigationContainer theme={ThemeContext.navigation.container}>
            {props.children}
        </NavigationContainer>
    );
}

export default {
    Provider: NavigationProvider,
    //useContext: useNavigationContext,
};

/*

====================================================================================================
 Navigation Provider
====================================================================================================
function Group<ParamList extends ParamListBase, ScreenOptions extends {}>(
    _: RouteGroupConfig<ParamList, ScreenOptions>
) {

return null;
}

uses the empty screen

wrap a navigator screen but return as navigator screen
- might need to forward ref

NavigationState
-

AuthenticatedRoutes

useRegisterNavigator


type StaticNavigation<NavigatorProps, GroupProps, ScreenProps> = {
  Navigator: React.ComponentType<NavigatorProps>;
  Group: React.ComponentType<GroupProps>;
  Screen: React.ComponentType<ScreenProps>;
  config: StaticConfig<NavigatorTypeBagBase>;
};

const NavigationScreen = React.memo(
    <T extends React.ComponentType<any>>({ component }: { component: T }) => {
        const navigator = useNavigator();
        return React.createElement(component, { navigator });
    }
);

   const render: React.ReactNode[] = [];

    // React.Children.forEach(props.children, (child, index) => {
    //     render.push(
    //         <Root.Screen
    //             name="PhoneLogin"
    //             component={child}
    //         />
    //     );
    // });

*/
