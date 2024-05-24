// import React from 'react';
// import { useRoute } from '@react-navigation/native';
// // eslint-disable-next-line import/no-named-as-default
// import Svg, { Path } from 'react-native-svg';
//
// import Theme from '@theme';
// import { Text, Row, PressableOpacity } from '@components/ui';
//
// import { AppbarActions } from './types';
//
// const HeaderRight = ({
//     title = 'Continue',
//     onPress,
//     disabled,
//     hide_icon = false,
//     color = 'text_emphasis',
// }: AppbarActions) => {
//     const route = useRoute();
//     const { theme } = Theme.useContext();
//
//     // @ts-ignore
//     const continue_disabled = disabled || route.params?.continue_disabled;
//
//     const title_color = color;
//     const icon_color = theme.colors[color];
//
//     // @ts-ignore
//     if (route.params?.continue_hidden) {
//         return null;
//     }
//
//     return (
//         <PressableOpacity
//             hitSlop={50}
//             onPress={!continue_disabled && onPress ? () => onPress() : null}
//             disabled={continue_disabled}
//         >
//             <Row
//                 justifyContent="center"
//                 gap="s"
//                 paddingHorizontal="s"
//             >
//                 <Text
//                     variant="body"
//                     color={title_color}
//                 >
//                     {title}
//                 </Text>
//                 {!hide_icon && (
//                     <Svg
//                         width="12"
//                         height="21"
//                         viewBox="0 0 12 21"
//                     >
//                         <Path
//                             d="M2.46287 0.417333L11.7078 9.5542C12.0974 9.93881 12.0974 10.5602 11.7078 10.9458L2.46286 20.0827C1.90053 20.6391 0.985625 20.6391 0.422297 20.0827C-0.140033 19.5262 -0.140033 18.6231 0.422297 18.0667L8.33087 10.2495L0.422298 2.43432C-0.140032 1.87687 -0.140032 0.973776 0.422298 0.417333C0.985627 -0.139111 1.90054 -0.139111 2.46287 0.417333"
//                             fill={icon_color}
//                         />
//                     </Svg>
//                 )}
//             </Row>
//         </PressableOpacity>
//     );
// };
//
// export { HeaderRight };
