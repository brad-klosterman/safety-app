import type { AlarmsState } from './types/Alarms.types';

const DEFAULT_PAGINATION_PARAMS = { page: 1, per_page: 50 };

const DEFAULT_ALARMS_STATE: AlarmsState = {
    active_count: 0,
    active_mobile: null,
    alarms_stack: {
        alarms: [],
        pagination_state: {
            count: 0,
            items: 0,
            ...DEFAULT_PAGINATION_PARAMS,
        },
        filters_state: {
            active: {},
            count: 0,
        },
    },
    subscribed_alarm: null,
};

export { DEFAULT_ALARMS_STATE, DEFAULT_PAGINATION_PARAMS };
