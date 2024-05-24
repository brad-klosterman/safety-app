import { AlarmsType } from '@state';
import { PaginationParams, PaginationState } from '@utils';

/**
 *  API.Mobile Types
 *
 **/

type APIMobileAlarm = {
    id: number;
    user_id: number;
    address: string | null;
    status:
        | 'requested'
        | 'delegated'
        | 'responding'
        | 'canceled'
        | 'closed'
        | 'non_emc'
        | 'saved'
        | 'acknowledged';
    latitude: number;
    longitude: number;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    close_reason: string | null;
};

type APIMobileAlarmParams = {
    latitude: number;
    longitude: number;
};

type APIMobileAlarmResponse = {
    latitude: number;
    longitude: number;
};

type APIMobileAlarmsResponse = {
    alarms: APIMobileAlarm[];
    pagination: PaginationState;
};

type MappedAlarmsParams =
    | {
          id: number;
      }
    | {
          active_mobile: true;
      }
    | {
          filters: AlarmsType.AlarmsFilter;
          pagination_params: PaginationParams;
      };

type MappedAlarmsResponse<T> = T extends { pagination_params: PaginationParams }
    ? {
          alarms: AlarmsType.AlarmModel[];
          pagination_state: PaginationState;
      }
    : AlarmsType.AlarmModel | undefined;

type APIMobileAlarmBody = {
    transition: APIMobileAlarmTransition;
};

type APIMobileAlarmTransition =
    | {
          type: 'open_alarm';
          payload: APIMobileAlarmParams;
      }
    | {
          type: 'update_location';
          payload: APIMobileAlarmParams;
      }
    | {
          type: 'close_alarm'; // close
          payload: APICloseAlarmParams;
      }
    | {
          type: 'dismiss_info'; // cancel
          payload: null;
      }
    | {
          type: 'reopen_alarm'; // reopen
          payload: null;
      };

type APICloseAlarmParams = {
    close_reason: string;
    security_answer: string;
};

export type {
    APIMobileAlarm,
    APIMobileAlarmParams,
    APIMobileAlarmResponse,
    APIMobileAlarmsResponse,
    APIMobileAlarmBody,
    APIMobileAlarmTransition,
    APICloseAlarmParams,
    MappedAlarmsParams,
    MappedAlarmsResponse,
};
