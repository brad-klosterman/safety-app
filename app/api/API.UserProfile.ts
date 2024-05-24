import { AxiosRequestConfig } from 'axios';
import { APIFactory } from '@utils';

import type { ProfileType } from '@state';
import type { CoverageArea } from '@device';

import type {
    APIUserProfile,
    APIUserParams,
    APIUserResponse,
    APIFetchPasswordOptionsResponse,
    APIFetchCloseAlarmReasonsResponse,
    APIFetchCoverageResponse,
} from './types/API.UserProfile.types';

/**
 *  API.UserProfile
 *
 **/

class API_UserProfile {
    private readonly client: APIFactory;

    constructor(baseURL: string) {
        this.client = new APIFactory(baseURL);
    }

    public storeAuthorizationToken(token: string | null) {
        this.client.updateAuthorizationHeader(`Bearer ${token}`);
    }

    public async fetch(token?: string | null): Promise<ProfileType.UserProfileModel | null> {
        let config: AxiosRequestConfig | undefined;

        if (token) {
            config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        }

        return this.client.get<APIUserResponse>('/user', config).then((res) => {
            if (res.error) {
                return null;
            }

            return this.mapUserProfile(res.user);
        });
    }

    public async update(params: APIUserParams): Promise<ProfileType.UserProfileModel> {
        const data = new FormData();

        for (const [key, value] of Object.entries(params)) {
            if (key === 'image') {
                if (value) {
                    data.append('image', {
                        uri: value,
                        name: 'user_profile.jpg',
                        type: 'image/jpg',
                    } as unknown as Blob);
                } else {
                    data.append(key, '');
                }
            } else {
                data.append(key, typeof value === 'string' ? value : '');
            }
        }

        return this.client.patchForm<APIUserResponse>('/user', data).then((res) => {
            if (res.error) {
                throw new Error('Error: API:User');
            } else {
                return this.mapUserProfile(res.user);
            }
        });
    }

    public async fetchCoverageAreas(): Promise<{
        areas: {
            area: CoverageArea;
        }[];
    }> {
        return this.client.get<APIFetchCoverageResponse>('/user/coverage').then((res) => {
            if (res.error) {
                throw new Error('Error: API:User');
            } else {
                return res;
            }
        });
    }

    public async fetchPasswordOptions(): Promise<string[]> {
        return this.client
            .get<APIFetchPasswordOptionsResponse>('/user/generate_security_question_answers')
            .then((res) => {
                if (res.error) {
                    throw new Error('Error: API:User');
                } else {
                    return res.security_question_answers;
                }
            });
    }

    public async fetchCloseAlarmReasons(): Promise<string[]> {
        return this.client
            .get<APIFetchCloseAlarmReasonsResponse>('/user/close_reasons')
            .then((res) => {
                if (res.error) {
                    throw new Error('Error Fetching Close Alarm Reasons');
                } else {
                    return res.alarm_close_reasons;
                }
            });
    }

    public async setPushToken(fcm_token: string): Promise<boolean> {
        return this.client.post<boolean>('/fcm_tokens', { fcm_token }).then((res) => {
            if (res.error) {
                throw new Error('Error Updating Push Token');
            } else {
                return res;
            }
        });
    }

    private mapUserProfile(rest: APIUserProfile): ProfileType.UserProfileModel {
        return {
            firstname: rest.firstname || '',
            lastname: rest.lastname || '',
            phone_number: '',
            medical: {
                gender: rest.gender,
                bloodtype: rest.bloodtype,
                year_of_birth: rest.year_of_birth ? rest.year_of_birth.toString() : '',
                insurance_name: rest.insurance_name,
                insurance_plan: rest.insurance_plan,
                insurance_policy_id: rest.insurance_policy_id,
                medical_conditions: rest.medical_conditions,
            },
            emergency_contact: {
                firstname: rest.emergency_contact_firstname,
                lastname: rest.emergency_contact_lastname,
                phone_number: rest.emergency_contact_phone,
            },
            profile_picture_url: rest.image_url ? `https:${rest.image_url}` : null,
            security: {
                security_answer: rest.security_answer,
                panics_allowed: rest.panics_allowed,
            },
            properties: rest.properties || [],
            ssp: {
                id: rest.company_info.company_id,
                name: rest.company_info.company_name,
                logo_uri: rest.company_info.company_logo_url,
                terms_and_conditions: rest.company_info.company_terms_and_conditions,
            },
        };
    }
}

export default API_UserProfile;
