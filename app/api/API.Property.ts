import qs from 'qs';
import { APIFactory, removeEmptyKeys, formatStartDateFilter } from '@utils';

import type { AlarmModel, AlarmTriggeredZones } from '../app.state/alarms/types/AlarmModel';

import type {
    APIPropertyAlarm,
    APIPropertyZone,
    APIPropertyAlarmResponse,
    APIPropertyAlarmsParams,
    APIPropertyAlarmsResponse,
    APIPropertyAlarmBody,
    APICloseAlarmParams,
    MappedAlarmsParams,
    MappedAlarmsResponse,
} from './types/API.Property.types';

/**
 *  API.Property
 *
 **/

class API_Property {
    private readonly client: APIFactory;

    constructor(baseURL: string) {
        this.client = new APIFactory(baseURL);
    }

    public storeAuthorizationToken(token: string | null) {
        this.client.updateAuthorizationHeader(`Bearer ${token}`);
    }

    public async fetch<T extends MappedAlarmsParams>(params: T): Promise<MappedAlarmsResponse<T>> {
        let path;

        if ('id' in params) {
            path = `/alarms/list-home-alarms?query[id_eq]=${params.id}`;
        }

        if ('pagination_params' in params) {
            if ('active' in params.filters) {
                path = `alarms/active-home-alarms`;
            } else {
                path =
                    '/alarms/list-home-alarms?' +
                    qs.stringify(
                        removeEmptyKeys<APIPropertyAlarmsParams>({
                            ...params.pagination_params,
                            'query[created_at_gteq]': formatStartDateFilter(
                                params.filters?.date_range
                            ),
                            'query[client_physical_address_cont]': params.filters?.property,
                        }),
                        { arrayFormat: 'repeat', encode: false }
                    );
            }
        }

        return this.client.get<APIPropertyAlarmsResponse>(path).then((res) => {
            if (res.error) {
                throw new Error('Error: APIProperty');
            }
            const alarms = res.home_alarms.reduce(
                (acc: AlarmModel[], cur: APIPropertyAlarm): AlarmModel[] => [
                    ...acc,
                    this.mapPropertyAlarm(cur),
                ],
                []
            );

            if ('pagination' in params) {
                return {
                    alarms,
                    pagination_state: { ...res.pagination, per_page: 50 },
                } as MappedAlarmsResponse<T>;
            }

            return alarms[0] as MappedAlarmsResponse<T>;
        });
    }

    public async confirmEmergency(id: number): Promise<boolean> {
        const body: APIPropertyAlarmBody = {
            transition: {
                type: 'ack_alarm',
                payload: null,
            },
            home_alarm_id: id,
        };

        return this.client
            .post<APIPropertyAlarmsResponse>('/home_alarm_states', body)
            .then((res) => true);
    }

    public async cancel(id: number): Promise<boolean> {
        const body: APIPropertyAlarmBody = {
            transition: {
                type: 'dismiss_info',
                payload: null,
            },
            home_alarm_id: id,
        };

        return this.client
            .post<APIPropertyAlarmResponse>('/home_alarm_states', body)
            .then((res) => true);
    }

    public async close(
        id: number,
        params: APICloseAlarmParams | { non_emergency: true }
    ): Promise<boolean> {
        let body: APIPropertyAlarmBody;
        if ('non_emergency' in params) {
            body = {
                transition: {
                    type: 'ack_alarm',
                    payload: null,
                },
                home_alarm_id: id,
            };
        } else {
            body = {
                transition: {
                    type: 'close_alarm',
                    payload: params,
                },
                home_alarm_id: id,
            };
        }

        return this.client
            .post<APIPropertyAlarmResponse>('/home_alarm_states', body)
            .then((res) => true);
    }

    public async reopen(id: number): Promise<boolean> {
        const body: APIPropertyAlarmBody = {
            transition: {
                type: 'reopen_alarm',
                payload: null,
            },
            home_alarm_id: id,
        };

        return this.client
            .post<APIPropertyAlarmResponse>('/home_alarm_states', body)
            .then((res) => true);
    }

    private mapPropertyAlarm(params: APIPropertyAlarm): AlarmModel {
        return {
            id: params.id,
            alarm_type: params.alarm_type,
            source_type: 'BOX',
            ...this.mapAlarmState(params),
            initial_alarm_allocation: params.initial_alarm_allocation,
            current_alarm_allocation: params.current_alarm_allocation,
            false_alarm: params.false_alarm,
            customer_cancelled: false,
            customer_requested_assistance: false,
            address: params.physical_address,
            coordinates: {
                latitude: 0,
                longitude: 0,
            },
            transmitter: {
                id: params.radio.id,
                name: params.radio.name,
                area: params.radio.area,
            },
            zones: [],
            keyholders: params.keyholders.sort((a, b) => {
                const a_1 = Number(Boolean(a.alarm_handling_status));
                const b_1 = Number(Boolean(b.alarm_handling_status));
                const a_2 = Number(a.notification_status);
                const b_2 = Number(b.notification_status);

                if (a_1 > b_1) return -1;
                if (a_1 < b_1) return 1;

                if (a_2 > b_2) return -1;
                if (a_2 < b_2) return 1;

                return 0;
            }),
            responder: params.responder,
            message_to_user: params.message_to_user,
            cancel_source: params.cancel_source,
            cancel_reason: params.cancel_reason,
            video_url: params.video_url,
            image_url: params.image_url,
            created_at: params.created_at,
            confirmed_at: params.confirmed_at,
            delegated_at: params.delegated_at,
            arrived_at: params.arrived_at,
            responded_at: params.responded_at,
            saved_at: params.saved_at,
            closed_at: params.closed_at,
            reopened_at: params.reopened_at,
            updated_at: params.updated_at,
        };
    }

    private mapTriggeredZones(params: APIPropertyZone[] | null) {
        if (!params) {
            return [];
        }

        return params.reduce(
            (
                triggered_zones: AlarmTriggeredZones[],
                api_zone: APIPropertyZone
            ): AlarmTriggeredZones[] => {
                return [
                    ...triggered_zones,
                    {
                        id: api_zone.id,
                        number: api_zone.zone,
                        zone_description: api_zone.zone_description,
                        created_at: api_zone.updated_at || '',
                    },
                ];
            },
            []
        );
    }

    private mapAlarmState(params: APIPropertyAlarm): {
        state: AlarmModel['state'];
        step: AlarmModel['step'];
        non_emergency: boolean;
    } {
        // current_alarm_allocation changes to non_emergency when the alarm is closed
        // to get the correct value for closed alarms we need to check the initial allocation
        const currently_non_emergency = params.current_alarm_allocation === 'non_emergency';
        const initially_non_emergency = params.initial_alarm_allocation === 'non_emergency';

        if (params.state === 'acknowledged') {
            return {
                state: 'CLOSED',
                step: 8,
                non_emergency: initially_non_emergency,
            };
        }
        if (params.state === 'closed' || params.closed_at) {
            return {
                state: 'KEYHOLDER_CLOSED',
                step: 7,
                non_emergency: initially_non_emergency,
            };
        }
        if (params.saved_at) {
            return {
                state: 'RESPONDER_CLOSED',
                step: 6,
                non_emergency: currently_non_emergency,
            };
        }
        if (params.arrived_at) {
            return {
                state: 'RESPONDER_ARRIVED',
                step: 5,
                non_emergency: currently_non_emergency,
            };
        }
        // responded_at
        if (params.responded_at) {
            return {
                state: 'RESPONDER_ENROUTE',
                step: 4,
                non_emergency: currently_non_emergency,
            };
        }
        if (params.delegated_at) {
            return {
                state: 'RESPONDER_DISPATCHED',
                step: 3,
                non_emergency: currently_non_emergency,
            };
        }
        if (params.confirmed_at) {
            return {
                state: 'KEYHOLDER_CONFIRMED',
                step: 2,
                non_emergency: currently_non_emergency,
            };
        }
        return {
            state: 'OPENED',
            step: 1,
            non_emergency: currently_non_emergency,
        };
    }
}

export default API_Property;

// if (params.filters?.date_range) {
//     const start_date = new Date();
//     start_date.setDate(start_date.getDate() - params.filters.date_range);
//
//     path += `&query[created_at_gteq]=${dateToString(start_date)}`;
// }
//
// if (params.filters?.property_id) {
//     path += `&query[client_physical_address_cont]=${params.filters.property}`;
// }
