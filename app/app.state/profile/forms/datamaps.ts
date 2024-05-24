import type { UserProfileModel, ProfileFormFields } from '../types/User.types';

const mapProfileFormFields = (params: UserProfileModel | null): ProfileFormFields => ({
    firstname: params?.firstname,
    lastname: params?.lastname,
    gender: params?.medical?.gender || null,
    year_of_birth: params?.medical?.year_of_birth || '',
    insurance_name: params?.medical?.insurance_name || '',
    insurance_plan: params?.medical?.insurance_plan || '',
    insurance_policy_id: params?.medical?.insurance_policy_id || '',
    medical_conditions: params?.medical?.medical_conditions || '',
    bloodtype: params?.medical?.bloodtype || null,
    emergency_contact_firstname: params?.emergency_contact?.firstname || '',
    emergency_contact_lastname: params?.emergency_contact?.lastname || '',
    emergency_contact_phone: params?.emergency_contact?.phone_number || '',
    image: params?.profile_picture_url || '',
    security_answer: params?.security?.security_answer || '',
});

export { mapProfileFormFields };
