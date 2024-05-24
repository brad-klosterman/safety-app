import { ScrollView, StyleSheet } from 'react-native';
import { type NavbarScreenName } from '@navigation/type.Navigation';
import { type BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';

import { Profile } from '@state';
import { getNavbarIcon, ScreenView } from '@components/elements';
import { Flex, Text } from '@components/ui';

/**
 *  Properties Manager
 *   -----
 *
 **/
function PropertiesManager() {
    const ProfileContext = Profile.useContext();
    const properties = ProfileContext.profile?.properties || [];

    return (
        <ScreenView>
            <ScrollView
                style={styles.scroll_view}
                contentContainerStyle={styles.content_container}
            >
                {properties &&
                    properties.map((property) => (
                        <Flex
                            key={property.id}
                            style={styles.row}
                            padding="m"
                            borderBottomColor="menu_border"
                        >
                            <Text>
                                {property.address
                                    ? property.address.toUpperCase()
                                    : 'NO ADDRESS AVAILABLE'}
                            </Text>
                        </Flex>
                    ))}
            </ScrollView>
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    scroll_view: {
        overflow: 'hidden',
        width: '100%',
    },
    content_container: {},
    row: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        minHeight: 80,
    },
});

PropertiesManager.Options = {
    tabBarLabel: 'Properties',
    tabBarIcon: getNavbarIcon('gear'),
    headerShown: true,
} as BottomTabNavigationOptions;

export { PropertiesManager };

/*

const AlbumsScreen = () => {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const isFocused = useIsFocused();

  return (
    <>
      {isFocused && Platform.OS === 'android' && (
        <StatusBar barStyle="light-content" />
      )}
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: tabBarHeight,
        }}
      >
        <Albums scrollEnabled={false} />
      </ScrollView>
    </>
  );
};
 */
