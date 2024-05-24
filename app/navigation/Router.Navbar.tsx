import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import Theme from '@theme';
// import { NavbarScreen } from '@screens/NavbarScreen';
// import { NavbarRouteComponentType } from './type.Navigation';
import type { NavbarRoutesConfig, NavbarScreenName } from './type.Navigation';

export const NavbarRouter = createBottomTabNavigator<NavbarRoutesConfig>();

/**
 * Navbar Router
 * @param props.screens
 */
// function NavbarRouter(props: { screens: NavbarRouteComponentType[] }) {
//     const ThemeContext = Theme.useContext();
//
//     return (
//         <Navigator
//             id="NavbarRouter"
//             //initialRouteName={initial_route}
//             screenOptions={{
//                 ...ThemeContext.navigation.navbar,
//                 tabBarHideOnKeyboard: true,
//             }}
//         >
//             {props.screens.map((screen) => (
//                 <Screen
//                     key={screen.ScreenName}
//                     name={screen.ScreenName}
//                     component={screen}
//                     options={screen.Options}
//                 />
//             ))}
//         </Navigator>
//     );
// }
//
// export default React.memo(NavbarRouter);

// const EXAMPLE_SCREENS = {
//     ScrollableTabBar,
//     AutoWidthTabBar,
//     TabBarIcon,
//     CustomIndicator,
//     CustomTabBar,
//     Coverflow,
// } as const;
//
// const EXAMPLE_SCREEN_NAMES = Object.keys(
//     EXAMPLE_SCREENS
// ) as (keyof typeof EXAMPLE_SCREENS)[];
//
// export type TabViewStackParams = {
//     [Key in keyof typeof EXAMPLE_SCREENS]: undefined;
// } & {
//     ExampleList: undefined;
// };
//
// const linking: PathConfigMap<TabViewStackParams> = {
//     ExampleList: '',
//     ...EXAMPLE_SCREEN_NAMES.reduce(
//         (acc, name) => ({
//             ...acc,
//             [name]: name
//                 .replace(/([A-Z]+)/g, '-$1')
//                 .replace(/^-/, '')
//                 .toLowerCase(),
//         }),
//         {}
//     ),
// };
//
// const TabViewStack = createStackNavigator<TabViewStackParams>();
//
// const ExampleListScreen = ({
//                                navigation,
//                            }: StackScreenProps<TabViewStackParams, 'ExampleList'>) => {
//     return (
//         <ScrollView>
//             {EXAMPLE_SCREEN_NAMES.map((name) => (
//                 <React.Fragment key={name}>
//                     <ListItem
//                         testID={name}
//                         title={EXAMPLE_SCREENS[name].options.title}
//                         onPress={() => {
//                             navigation.navigate(name);
//                         }}
//                     />
//                     <Divider />
//                 </React.Fragment>
//             ))}
//         </ScrollView>
//     );
// };
//
// export function TabView() {
//     return (
//         <TabViewStack.Navigator
//             screenOptions={{ headerMode: 'screen', cardStyle: { flex: 1 } }}
//         >
//             <TabViewStack.Screen
//                 name="ExampleList"
//                 component={ExampleListScreen}
//                 options={{
//                     title: 'TabView Examples',
//                 }}
//             />
//             {EXAMPLE_SCREEN_NAMES.map((name) => {
//                 return (
//                     <TabViewStack.Screen
//                         key={name}
//                         name={name}
//                         component={EXAMPLE_SCREENS[name]}
//                         options={EXAMPLE_SCREENS[name].options}
//                     />
//                 );
//             })}
//         </TabViewStack.Navigator>
//     );
// }
