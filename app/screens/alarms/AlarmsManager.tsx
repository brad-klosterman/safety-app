import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { type BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { type NavbarScreenProps } from '@navigation/type.Navigation';

import { Alarms, type AlarmsType } from '@state';
import { formatDateTime } from '@utils';
import { getNavbarIcon, ScreenView, Modal } from '@components/elements';
import { Flex, Loading, Text } from '@components/ui';

import {
    ActiveAlarmsBanner,
    AlarmRow,
    AlarmsHeaderRight,
    AlarmsSearch,
    EmptyAlarmsStack,
} from './atoms';

/**
 *  Alarms Manager Screen (Alarms Stack)
 *   -----
 *
 **/
function AlarmsManager(props: NavbarScreenProps<'AlarmsManager'>) {
    const { navigation } = props;
    const {
        state: {
            active_count,
            alarms_stack: { alarms, filters_state, pagination_state },
        },
        dispatch,
    } = Alarms.useContext();

    const [search_open, setSearchOpen] = React.useState(false);

    const fetching_alarms = true;
    const fetching_more_alarms = true;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Alarms',
            headerRight: () => (
                <AlarmsHeaderRight
                    openSearch={() => setSearchOpen(true)}
                    active_filters_count={filters_state.count}
                />
            ),
        });
    }, [active_count, filters_state.count, navigation]);

    const fetchAlarms = async (filters: AlarmsType.AlarmsFilter) => {
        await dispatch({
            payload: {
                filters,
            },
            type: 'FETCH_ALARMS_STACK_DATA',
        });
    };

    const fetchMoreAlarms = async () => {
        await dispatch({
            payload: {
                filters: filters_state.active,
                pagination_params: {
                    ...pagination_state,
                    page: pagination_state.page + 1,
                },
            },
            type: 'FETCH_ALARMS_STACK_DATA',
        });
    };

    /** FlashList */
    const list = React.useRef<FlashList<AlarmsType.AlarmsStackRow> | null>(null);

    // do the data formatting and manipulation before the flatlist render
    const prepared_alarms = React.useMemo(
        () =>
            (alarms || []).map(
                ({
                    id,
                    alarm_type,
                    non_emergency,
                    updated_at,
                    address,
                    state,
                    source_type,
                }): AlarmsType.AlarmsStackRow => ({
                    // only return the properties that need to be rendered and leave everything else
                    id,
                    state: state.replace(/[-_]/g, ' '),
                    non_emergency,
                    source_type,
                    alarm_type: (alarm_type || '').toUpperCase(),
                    is_active: Alarms.isActiveAlarm(state),
                    address: address || '',
                    updated_at:
                        formatDateTime({
                            date: updated_at,
                            format: 'dateTime',
                            locale: 'en-ZA',
                        }) || '',
                })
            ),
        [alarms]
    );

    const renderRow = ({
        item: alarm,
        index,
    }: {
        item: AlarmsType.AlarmsStackRow;
        index: number;
    }) => (
        <AlarmRow
            alarm={alarm}
            openAlarm={() => {
                props.navigation.navigate('AlarmOverview', { ...alarm, index });
            }}
        />
    );

    const renderLoader = React.useCallback(() => {
        return (
            <>
                {fetching_more_alarms && (
                    <ActivityIndicator
                        size="large"
                        color="#aaa"
                    />
                )}
                {/*<NavbarSpacer />*/}
            </>
        );
    }, []);

    const keyExtractor = React.useCallback(
        (item: AlarmsType.AlarmsStackRow) => item.id.toString(),
        []
    );
    const emptyList = React.useCallback(() => <EmptyAlarmsStack />, []);

    const applyFilters = async (filters: AlarmsType.AlarmsFilter) => {
        await fetchAlarms(filters);
        setSearchOpen(false);
    };

    return (
        <ScreenView>
            <ActiveAlarmsBanner {...{ active_count }} />
            {fetching_alarms ? (
                <Loading />
            ) : (
                <SafeAreaView style={styles.container}>
                    <FlashList
                        removeClippedSubviews
                        ref={list}
                        data={prepared_alarms}
                        renderItem={renderRow}
                        keyExtractor={keyExtractor}
                        ListEmptyComponent={emptyList}
                        ListFooterComponent={renderLoader}
                        estimatedItemSize={50}
                        onEndReachedThreshold={0.1}
                        onEndReached={fetchMoreAlarms}
                    />
                </SafeAreaView>
            )}
            <Modal visible={search_open}>
                <AlarmsSearch
                    onApply={applyFilters}
                    onClose={() => setSearchOpen(false)}
                    active_filters={filters_state.active}
                    loading={fetching_alarms}
                />
            </Modal>
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

AlarmsManager.Options = {
    tabBarLabel: 'Alarms',
    tabBarIcon: getNavbarIcon('bell'),
    //tabBarBadge: active_alarm_count || undefined,
} as BottomTabNavigationOptions;

export { AlarmsManager };
