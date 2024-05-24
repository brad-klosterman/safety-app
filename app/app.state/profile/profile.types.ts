/**
 *   User Profile Model
 *   ---
 **/

type UserProfileModel = {
    firstname: string;
    lastname: string;
    phone_number: string | null;
    medical: ProfileMedical;
    emergency_contact: ProfileEmergencyContact;
    profile_picture_url: string | null;
    security: UserSecuritySettings;
    properties: PropertyModel[];
    ssp: SSPModel;
};

type ProfileMedical = {
    year_of_birth: string | null;
    gender: 'male' | 'female' | 'diverse' | null;
    bloodtype: 'A+' | 'B+' | 'A-' | 'B-' | 'AB-' | 'AB+' | '0+' | '0-' | null;
    insurance_name: string | null;
    insurance_plan: string | null;
    insurance_policy_id: string | null;
    medical_conditions: string | null;
};

type ProfileEmergencyContact = {
    firstname: string | null;
    lastname: string | null;
    phone_number: string | null;
};

type UserSecuritySettings = {
    security_answer: string | null;
    panics_allowed: string | boolean;
};

type PropertyModel = {
    id: number;
    address: string;
};

type SSPModel = {
    id: number;
    name: string;
    logo_uri: string | null;
    terms_and_conditions: string | null;
};

export type {
    UserProfileModel,
    ProfileMedical,
    ProfileEmergencyContact,
    UserSecuritySettings,
    PropertyModel,
    SSPModel,
};

/**
 *   User Profile Form
 *   ---
 **/

type ProfileFormFields = {
    firstname?: string;
    lastname?: string;
    security_answer?: string;
    gender: ProfileMedical['gender'];
    year_of_birth?: string;
    insurance_name?: string;
    insurance_plan?: string;
    insurance_policy_id?: string;
    medical_conditions?: string;
    bloodtype: ProfileMedical['bloodtype'];
    emergency_contact_firstname?: string;
    emergency_contact_lastname?: string;
    emergency_contact_phone?: string;
    image?: string;
};

type LanguageOptionKey = 'english';

export type { ProfileFormFields };

/**
 *   User Profile Context Provider
 *   ---
 **/

type ProfileContextValue = {
    profile: UserProfileModel | null;
    onboarded: boolean | undefined;
    security_password_options: string[];
    //action: ProfileActionHandler;
    // subscribe: (target: string) => EventConsumer<UserEventEmitterMap>;
    // emit: UserEventEmitter['emit'];
};

type ProfileActionHandler = {
    updateProfileStorage(data: UserProfileModel): void;
    updateProfileOnboardedStatus(onboarded: boolean): void;
    logout(): Promise<void>;
};

export type { ProfileContextValue, ProfileActionHandler };
