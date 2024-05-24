/**
 *  API.UserProfile Types
 *
 **/
import { ProfileType } from '@state';

type APIUserProfile = {
    firstname: string | null;
    lastname: string | null;
    security_answer: string | null;
    company_id: number;
    gender: 'male' | 'female' | 'diverse' | null;
    year_of_birth: number | null;
    insurance_name: string | null;
    insurance_plan: string | null;
    insurance_policy_id: string | null;
    medical_conditions: string | null;
    bloodtype: 'A+' | 'B+' | 'A-' | 'B-' | 'AB-' | 'AB+' | '0+' | '0-' | null;
    emergency_contact_firstname: string | null;
    emergency_contact_lastname: string | null;
    emergency_contact_phone: string | null;
    panics_allowed: boolean;
    state: string | null;
    image_url: string | null;
    company_info: {
        company_id: number;
        company_name: string;
        company_logo: string | null;
        company_logo_url: string | null;
        company_terms_and_conditions: string | null;
        mobile_theme_options: {
            brand_primary_color_dark: string | null;
            brand_primary_color_light: string | null;
            brand_secondary_color_dark: string | null;
            brand_secondary_color_light: string | null;
        };
    };
    properties: {
        id: number;
        address: string;
    }[];
};

type APIUserParams = Partial<ProfileType.ProfileFormFields>;

type APIUserResponse = {
    user: APIUserProfile;
};

type APIFetchPasswordOptionsResponse = {
    security_question_answers: string[];
};

type APIFetchCloseAlarmReasonsResponse = {
    alarm_close_reasons: string[];
};

type APIFetchCoverageResponse = {
    areas: {
        area: { lat: number; lng: number }[];
    }[];
};

export type {
    APIUserProfile,
    APIUserParams,
    APIUserResponse,
    APIFetchPasswordOptionsResponse,
    APIFetchCloseAlarmReasonsResponse,
    APIFetchCoverageResponse,
};
