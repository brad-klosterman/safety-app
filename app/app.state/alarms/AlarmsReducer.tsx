import { isActiveAlarm } from './Alarms.util';
import type { AlarmsState, AlarmsReducerEvent } from './types/Alarms.types';

function AlarmsReducer(state: AlarmsState, action: AlarmsReducerEvent): AlarmsState {
    switch (action.type) {
        case 'STORE_ACTIVE_COUNT': {
            return { ...state, active_count: action.payload };
        }
        case 'STORE_ALARMS_STACK_DATA': {
            return { ...state, alarms_stack: action.payload };
        }
        case 'STORE_ACTIVE_MOBILE_ALARM': {
            return { ...state, active_mobile: action.payload };
        }
        case 'STORE_INCOMING_OR_UPDATED_ALARM': {
            const source_type = action.payload.source_type;
            const active = isActiveAlarm(action.payload.state);
            const subscribed = state.subscribed_alarm?.id === action.payload.id;
            const non_emergency = action.payload.non_emergency;

            let new_active_count = state.active_count;

            if (source_type === 'MOBILE') {
                return {
                    ...state,
                    active_mobile: active ? action.payload : null,
                };
            }

            const updated_alarms = [...state.alarms_stack.alarms];

            const alarm_index = updated_alarms.findIndex(
                (stored_alarm) => stored_alarm.id === action.payload.id
            );

            if (alarm_index !== -1) {
                /** Update Alarm */
                updated_alarms[alarm_index] = action.payload;
                if (!active && !non_emergency) {
                    new_active_count -= 1;
                }
            } else {
                /** Add Alarm */
                updated_alarms.unshift(action.payload);
                if (action && !non_emergency) {
                    new_active_count += 1;
                }
            }

            return {
                ...state,
                active_count: new_active_count,
                alarms_stack: {
                    ...state.alarms_stack,
                    alarms: updated_alarms,
                },
                subscribed_alarm: subscribed ? action.payload : state.subscribed_alarm,
            };
        }
        case 'STORE_SUBSCRIBED_ALARM': {
            return { ...state, subscribed_alarm: action.payload };
        }
        default:
            return state;
    }
}

export { AlarmsReducer };
