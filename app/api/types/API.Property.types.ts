import { AlarmsType } from '@state';
import { PaginationParams, PaginationState } from '@utils';

/**
 *  API.Property Types
 *
 **/

type APIPropertyAlarm = {
    id: number;
    alarm_type: string;
    state:
        | 'requested'
        | 'delegated'
        | 'responding'
        | 'canceled'
        | 'closed'
        | 'non_emc'
        | 'saved'
        | 'acknowledged';
    current_state: 'OPEN' | 'IDLE' | 'SAVED' | 'FAKE_IDLE' | 'WAITING_FOR_ACK';
    initial_alarm_allocation:
        | 'system_generated'
        | 'history'
        | 'non_emergency'
        | 'emergency'
        | 'phone_in';
    current_alarm_allocation:
        | 'system_generated'
        | 'history'
        | 'non_emergency'
        | 'emergency'
        | 'phone_in';
    false_alarm: boolean;
    physical_address: string | null;
    video_url: string | null;
    image_url: string | null;
    message_to_user: string | null;
    radio: {
        id: number;
        area: string | null;
        name: string | null;
    };
    triggered_zones: APIPropertyZone[] | null;
    keyholders: {
        id: number;
        full_name: string;
        notification_status: boolean;
        alarm_handling_status: string;
    }[];
    responder: string | null;
    cancel_source: string | null;
    cancel_reason: string | null;
    created_at: string;
    confirmed_at: string | null;
    delegated_at: string | null;
    arrived_at: string | null;
    responded_at: string | null;
    saved_at: string | null;
    closed_at: string | null;
    reopened_at: string | null;
    updated_at: string | null;
};

type APIPropertyZone = {
    id: number;
    decoder: string | null;
    multi_zone: boolean;
    zone: string | null;
    zone_description: string | null;
    alarm_type: string | null;
    updated_at: string | null;
};

type APIPropertyAlarmResponse = {
    alarm_id: number;
    state: {
        type: string;
    };
};

type APIPropertyAlarmsParams = PaginationParams & {
    'query[created_at_gteq]'?: string;
    'query[created_at_lteq]'?: string;
    'query[client_physical_address_cont]'?: string;
};

type APIPropertyAlarmsResponse = {
    home_alarms: APIPropertyAlarm[];
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

type APIPropertyAlarmBody = {
    home_alarm_id: number;
    transition: APIPropertyAlarmTransition;
};

type APIPropertyAlarmTransition =
    | {
          type: 'ack_alarm';
          payload: null;
      }
    | {
          type: 'close_alarm';
          payload: APICloseAlarmParams;
      }
    | {
          type: 'dismiss_info';
          payload: null;
      }
    | {
          type: 'reopen_alarm';
          payload: null;
      };

type APICloseAlarmParams = {
    close_reason: string;
    security_answer: string;
};

export type {
    APIPropertyAlarm,
    APIPropertyZone,
    APIPropertyAlarmResponse,
    APIPropertyAlarmsParams,
    APIPropertyAlarmsResponse,
    APIPropertyAlarmBody,
    APIPropertyAlarmTransition,
    APICloseAlarmParams,
    MappedAlarmsParams,
    MappedAlarmsResponse,
};
