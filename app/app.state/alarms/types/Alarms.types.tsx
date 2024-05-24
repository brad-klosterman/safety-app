import {
    type PaginationParams,
    type PaginationState,
    type DispatchHandler,
    type Dispatcher,
    type UpdateReducerState,
} from '@utils';

import type {
    AlarmModel,
    AlarmSource,
    AlarmState,
    AlarmStackAllocation,
    ALARM_STEP,
    AlarmTriggeredZones,
    AlarmTransmitterModel,
    PropertyKeyholderModel,
} from './AlarmModel';

/** Alarms Context */

type AlarmsContextValue = {
    state: AlarmsState;
    dispatch: Dispatcher<AlarmsDispatchEvent>;
    updateState: UpdateReducerState<AlarmsReducerEvent>;
};

type AlarmsState = {
    active_count: number;
    active_mobile: AlarmModel | null;
    alarms_stack: AlarmsStackData;
    subscribed_alarm: AlarmModel | null;
};

type AlarmsStackData = {
    alarms: AlarmModel[];
    pagination_state: PaginationState;
    filters_state: {
        active: AlarmsFilter;
        count: number;
    };
};

type AlarmsStackRow = {
    id: number;
    alarm_type: string;
    non_emergency: boolean;
    source_type: AlarmSource;
    state: string;
    is_active: boolean;
    address: string;
    updated_at: string;
};

type AlarmsFilter =
    | {
          date_range?: number;
          property?: string;
      }
    | { active: true };

/** Alarm Forms */
type DeactivateAlarmForm = {
    selected_password: string;
    deactivation_reason: string;
};

/** Alarms Dispatcher */

type AlarmsDispatchEvent =
    | {
          type: 'FETCH_ACTIVE_ALARMS';
      }
    | {
          type: 'FETCH_ALARMS_STACK_DATA';
          payload?: {
              filters?: AlarmsFilter;
              pagination_params?: PaginationParams;
          };
      }
    | {
          type: 'SUBSCRIBE_TO_ALARM';
          payload: { alarm_id: number | null };
      }
    | {
          type: 'TRIGGER_PANIC_ALARM';
          payload: {
              coordinates: { latitude: number; longitude: number };
          };
      }
    | {
          type: 'CONFIRM_EMERGENCY';
          payload: { alarm_id: number };
      }
    | {
          type: 'DEACTIVATE_ALARM';
          payload:
              | { alarm_id: number } // NON-EMERGENCY BOX
              | {
                    alarm_id: number;
                    source_type: AlarmSource;
                    close_reason: string;
                    security_answer: string;
                };
      }
    | {
          type: 'REOPEN_ALARM';
          payload: {
              alarm_id: number;
              source_type: AlarmSource;
          };
      };

type AlarmsDispatchHandler = DispatchHandler<AlarmsDispatchEvent>;

/** Alarms Reducer */

type AlarmsReducerEvent =
    | {
          type: 'STORE_ACTIVE_COUNT';
          payload: number;
      }
    | {
          type: 'STORE_ALARMS_STACK_DATA';
          payload: AlarmsStackData;
      }
    | {
          type: 'STORE_ACTIVE_MOBILE_ALARM';
          payload: AlarmModel | null;
      }
    | {
          type: 'STORE_INCOMING_OR_UPDATED_ALARM';
          payload: AlarmModel;
      }
    | {
          type: 'STORE_SUBSCRIBED_ALARM';
          payload: AlarmModel | null;
      };

/** Exports */

export type {
    // Alarm Model
    AlarmModel,
    AlarmSource,
    AlarmState,
    AlarmStackAllocation,
    AlarmTriggeredZones,
    AlarmTransmitterModel,
    PropertyKeyholderModel,
    ALARM_STEP,
    // Alarms Context/State
    AlarmsContextValue,
    AlarmsState,
    AlarmsStackData,
    AlarmsStackRow,
    AlarmsFilter,
    // Form
    DeactivateAlarmForm,
    // Dispatcher
    AlarmsDispatchEvent,
    AlarmsDispatchHandler,
    // Reducer
    AlarmsReducerEvent,
};
