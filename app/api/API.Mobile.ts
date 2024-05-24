import { APIFactory } from '@utils';

import type { AlarmModel } from '../app.state/alarms/types/AlarmModel';
import type {
    APIMobileAlarm,
    APIMobileAlarmParams,
    APIMobileAlarmResponse,
    APIMobileAlarmsResponse,
    APIMobileAlarmBody,
    APICloseAlarmParams,
    MappedAlarmsParams,
    MappedAlarmsResponse,
} from './types/API.Mobile.types';

/**
 *  API.Mobile
 *
 **/

class API_Mobile {
    private readonly client: APIFactory;

    constructor(baseURL: string) {
        this.client = new APIFactory(baseURL);
    }

    public storeAuthorizationToken(token: string | null) {
        this.client.updateAuthorizationHeader(`Bearer ${token}`);
    }

    public async fetch<T extends MappedAlarmsParams>(
        params: T
    ): Promise<MappedAlarmsResponse<T> | null> {
        let path;

        if ('id' in params) {
            path = `/alarms/list-alarms?query[id_eq]=${params.id}`;
        }

        if ('active_mobile' in params) {
            path = `/alarms/active-alarms`;
        }

        if ('pagination_params' in params) {
            const { page, per_page } = params.pagination_params;
            path = `/alarms/list-alarms?page=${page}&per_page=${per_page}`;
        }

        return this.client.get<APIMobileAlarmsResponse>(path).then((res) => {
            if (res.error) {
                throw new Error('Error: APIMobile');
            }

            const alarms = res.alarms.map((api_alarm) => this.mapMobileAlarm(api_alarm));

            if ('pagination_params' in params) {
                return {
                    alarms,
                    pagination_state: res.pagination,
                } as MappedAlarmsResponse<T>;
            }

            return alarms[0] as MappedAlarmsResponse<T>;
        });
    }

    public async create(params: APIMobileAlarmParams): Promise<boolean> {
        const body: APIMobileAlarmBody = {
            transition: {
                type: 'open_alarm',
                payload: params,
            },
        };

        return this.client.post<APIMobileAlarmResponse>('/alarm_states', body).then((res) => true);
    }

    public async update(params: APIMobileAlarmParams): Promise<boolean> {
        const body: APIMobileAlarmBody = {
            transition: {
                type: 'update_location',
                payload: params,
            },
        };

        return this.client.post<APIMobileAlarmResponse>('/alarm_states', body).then((res) => true);
    }

    public async close(params: APICloseAlarmParams): Promise<boolean> {
        const body: APIMobileAlarmBody = {
            transition: {
                type: 'close_alarm',
                payload: params,
            },
        };

        return this.client.post<APIMobileAlarmsResponse>('/alarm_states', body).then((res) => true);
    }

    public async cancel(): Promise<boolean> {
        const body: APIMobileAlarmBody = {
            transition: {
                type: 'dismiss_info',
                payload: null,
            },
        };

        return this.client.post<APIMobileAlarmResponse>('/alarm_states', body).then((res) => true);
    }

    public async reopen(id: number): Promise<boolean> {
        const body: APIMobileAlarmBody & { alarm_id: number } = {
            transition: {
                type: 'reopen_alarm',
                payload: null,
            },
            alarm_id: id,
        };

        return this.client.post<APIMobileAlarmResponse>('/alarm_states', body).then((res) => true);
    }

    private mapMobileAlarm(params: APIMobileAlarm): AlarmModel {
        function getAlarmState() {
            if (
                params.status === 'closed' ||
                params.status === 'acknowledged' ||
                params.closed_at
            ) {
                return 'KEYHOLDER_CLOSED';
            }
            if (params.status === 'saved') {
                return 'RESPONDER_CLOSED';
            }
            return 'OPENED';
        }
        return {
            id: params.id,
            cancel_reason: null,
            cancel_source: null,
            responder: null,
            alarm_type: 'MOBILE PANIC',
            source_type: 'MOBILE',
            state: getAlarmState(),
            non_emergency: false,
            step: 1,
            false_alarm: false,
            initial_alarm_allocation: 'emergency',
            current_alarm_allocation: 'emergency',
            customer_cancelled: false,
            customer_requested_assistance: false,
            address: null,
            coordinates: {
                latitude: params.latitude,
                longitude: params.longitude,
            },
            transmitter: null,
            zones: null,
            message_to_user: '',
            video_url: null,
            image_url: null,
            created_at: params.created_at,
            confirmed_at: null,
            delegated_at: null,
            arrived_at: null,
            responded_at: null,
            reopened_at: null,
            saved_at: null,
            closed_at: params.closed_at,
            updated_at: params.updated_at,
            keyholders: [],
        };
    }
}

export default API_Mobile;
