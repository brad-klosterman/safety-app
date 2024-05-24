type AlarmModel = {
    id: number;
    alarm_type: string | null;
    source_type: AlarmSource;
    state: AlarmState;
    non_emergency: boolean;
    initial_alarm_allocation: AlarmStackAllocation;
    current_alarm_allocation: AlarmStackAllocation;
    step: ALARM_STEP;
    false_alarm: boolean | null;
    customer_cancelled: boolean;
    customer_requested_assistance: boolean;
    address: string | null;
    coordinates: {
        latitude: number;
        longitude: number;
    } | null;
    transmitter: AlarmTransmitterModel | null;
    zones: AlarmTriggeredZones[] | null;
    keyholders: PropertyKeyholderModel[] | null;
    responder: string | null;
    video_url: string | null;
    image_url: string | null;
    message_to_user: string | null;
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

type AlarmSource = 'BOX' | 'MOBILE';

type AlarmState =
    | 'OPENED'
    | 'KEYHOLDER_CONFIRMED'
    | 'RESPONDER_DISPATCHED'
    | 'RESPONDER_ENROUTE'
    | 'RESPONDER_ARRIVED'
    | 'RESPONDER_CLOSED'
    | 'KEYHOLDER_CLOSED'
    | 'CLOSED';

type AlarmStackAllocation =
    | 'system_generated'
    | 'history'
    | 'non_emergency'
    | 'emergency'
    | 'phone_in';

type AlarmTransmitterModel = {
    id: number;
    name: string | null;
    area: string | null;
};

type AlarmTriggeredZones = {
    id: number;
    number: string | null;
    zone_description: string | null;
    created_at: string;
};

type PropertyKeyholderModel = {
    id: number;
    full_name: string;
    notification_status: boolean;
    alarm_handling_status: string;
};

type ALARM_STEP = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type {
    AlarmModel,
    AlarmSource,
    AlarmState,
    AlarmStackAllocation,
    ALARM_STEP,
    AlarmTriggeredZones,
    AlarmTransmitterModel,
    PropertyKeyholderModel,
};
