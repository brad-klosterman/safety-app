import React from 'react';

import API from '@api';
import Authentication from '../authentication/AuthenticationProvider';
import { createContextProvider, getActiveFiltersCount } from '@utils';

import { DEFAULT_PAGINATION_PARAMS, DEFAULT_ALARMS_STATE } from './Alarms.config';
import { AlarmsReducer } from './AlarmsReducer';
import type {
    AlarmsContextValue,
    AlarmsState,
    AlarmSource,
    AlarmsDispatchEvent,
    AlarmsDispatchHandler,
    AlarmsReducerEvent,
} from './types/Alarms.types';

const [Context, useContext] = createContextProvider<AlarmsContextValue>();

/**
 *  Alarms Context Provider
 *   -----
 *
 *      Event Handlers
 *
 *         - FETCH_ACTIVE_ALARMS
 *         - FETCH_ALARMS_STACK_DATA
 *         - TRIGGER_PANIC_ALARM
 *         - CONFIRM_EMERGENCY
 *         - DEACTIVATE_ALARM
 *         - REOPEN_ALARM
 *         - SUBSCRIBE_TO_ALARM
 *
 *        ---
 **/
const AlarmsProvider = (props: { children: React.ReactNode }) => {
    const [state, updateState] = React.useReducer<React.Reducer<AlarmsState, AlarmsReducerEvent>>(
        AlarmsReducer,
        DEFAULT_ALARMS_STATE
    );

    const authentication = Authentication.useContext();

    const event_handlers: AlarmsDispatchHandler = {
        /** Initialize Alarm Count and Active Mobile Alarm  */
        FETCH_ACTIVE_ALARMS: async () => {
            let active_count = 0;

            API.Property.fetch({
                filters: { active: true },
                pagination_params: DEFAULT_PAGINATION_PARAMS,
            }).then((res) => {
                active_count = res.alarms?.length;
            });

            API.Mobile.fetch({ active_mobile: true }).then((res) => {
                if (res) {
                    active_count += 1;
                    updateState({
                        payload: res,
                        type: 'STORE_ACTIVE_MOBILE_ALARM',
                    });
                }
            });

            updateState({
                payload: active_count,
                type: 'STORE_ACTIVE_COUNT',
            });
        },
        FETCH_ALARMS_STACK_DATA: async ({ payload: params }) => {
            const pagination_params = params?.pagination_params || DEFAULT_PAGINATION_PARAMS;
            const filters = params?.filters || {};

            API.Property.fetch({ filters, pagination_params }).then(
                ({ alarms, pagination_state }) => {
                    updateState({
                        payload: {
                            alarms,
                            pagination_state,
                            filters_state: {
                                active: filters,
                                count: getActiveFiltersCount(params?.filters),
                            },
                        },
                        type: 'STORE_ALARMS_STACK_DATA',
                    });
                }
            );
        },
        SUBSCRIBE_TO_ALARM: async ({ payload }) => {
            const alarm_index = payload.alarm_id
                ? state.alarms_stack.alarms.findIndex(
                      (stored_alarm) => stored_alarm.id === payload.alarm_id
                  )
                : null;

            updateState({
                payload: alarm_index ? state.alarms_stack.alarms[alarm_index] : null,
                type: 'STORE_SUBSCRIBED_ALARM',
            });
        },
        TRIGGER_PANIC_ALARM: async ({ payload }) => {
            await API.Mobile.create(payload.coordinates);

            API.Mobile.fetch({ active_mobile: true }).then((res) => {
                res &&
                    updateState({
                        payload: res,
                        type: 'STORE_INCOMING_OR_UPDATED_ALARM',
                    });
            });
        },
        CONFIRM_EMERGENCY: async ({ payload }) => {
            await API.Property.confirmEmergency(payload.alarm_id);

            API.Property.fetch({ id: payload.alarm_id }).then((res) => {
                res &&
                    updateState({
                        payload: res,
                        type: 'STORE_INCOMING_OR_UPDATED_ALARM',
                    });
            });
        },
        DEACTIVATE_ALARM: async ({ payload: params }) => {
            const alarm_id = params.alarm_id;
            const type =
                'source_type' in params
                    ? ({
                          source: 'BOX',
                          params: {
                              close_reason: params.close_reason,
                              security_answer: params.security_answer,
                          },
                      } as {
                          source: AlarmSource;
                          params: {
                              close_reason: string;
                              security_answer: string;
                          };
                      })
                    : ({ source: 'NON_EMERGENCY' } as { source: 'NON_EMERGENCY' });

            if (type.source === 'BOX') {
                await API.Property.close(alarm_id, type.params);
                API.Property.fetch({ id: alarm_id }).then((res) => {
                    res &&
                        updateState({
                            payload: res,
                            type: 'STORE_INCOMING_OR_UPDATED_ALARM',
                        });
                });
            }

            if (type.source === 'MOBILE') {
                await API.Mobile.close(type.params);
                API.Mobile.fetch({ id: alarm_id }).then((res) => {
                    res &&
                        updateState({
                            payload: { ...res, state: 'CLOSED' },
                            type: 'STORE_INCOMING_OR_UPDATED_ALARM',
                        });
                });
            }

            if (type.source === 'NON_EMERGENCY') {
                await API.Property.close(alarm_id, { non_emergency: true });
            }
        },
        REOPEN_ALARM: async ({ payload: params }) => {
            const alarm_id = params.alarm_id;
            const source_type = params.source_type;

            if (source_type === 'BOX') {
                await API.Property.reopen(alarm_id);
                API.Property.fetch({ id: alarm_id }).then((res) => {
                    res &&
                        updateState({
                            payload: res,
                            type: 'STORE_INCOMING_OR_UPDATED_ALARM',
                        });
                });
            }

            if (source_type === 'MOBILE') {
                await API.Mobile.reopen(alarm_id);
                API.Mobile.fetch({ id: alarm_id }).then((res) => {
                    res &&
                        updateState({
                            payload: res,
                            type: 'STORE_INCOMING_OR_UPDATED_ALARM',
                        });
                });
            }
        },
    };

    const dispatch = (event: AlarmsDispatchEvent) =>
        (
            event_handlers[event.type] as (
                params: Extract<AlarmsDispatchEvent, { type: (typeof event)['type'] }>
            ) => Promise<boolean>
        )(event);

    React.useEffect(() => {
        if (authentication.state === 'authenticated_session') {
            (async () => {
                await dispatch({ type: 'FETCH_ACTIVE_ALARMS' });
                await dispatch({ type: 'FETCH_ALARMS_STACK_DATA' });
            })();
        }
    }, [authentication.state]);

    return (
        <Context.Provider value={{ dispatch, state, updateState }}>
            {props.children}
        </Context.Provider>
    );
};

export default { Provider: React.memo(AlarmsProvider), useContext };
