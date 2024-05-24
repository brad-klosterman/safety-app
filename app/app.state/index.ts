/** Alarms **/
import AlarmContext from './alarms/AlarmsContext';
import { isActiveAlarm } from './alarms/Alarms.util';

export const Alarms = {
    Provider: AlarmContext.Provider,
    useContext: AlarmContext.useContext,
    isActiveAlarm,
};
export type * as AlarmsType from './alarms/types/Alarms.types';

/** Authentication **/
import AuthenticationProvider from './authentication/AuthenticationProvider';

export const Authentication = {
    ...AuthenticationProvider,
};
export type * as AuthenticationType from './authentication/type.Authentication';

/** Notification **/
import NotificationsContext from './notifications/NotificationsContext';

export const Notifications = {
    Provider: NotificationsContext.Provider,
    useContext: NotificationsContext.useContext,
};
export type * as NotificationsType from './notifications/types/Notifications.types';

/** Profile **/
import ProfileProvider from './profile/ProfileProvider';
import ProfileFormProvider from './profile/forms/Provider';
import { mapProfileFormFields } from './profile/forms/datamaps';
import { SELECTOR_OPTIONS } from './profile/forms/config';
export const Profile = {
    ...ProfileProvider,
    FormProvider: ProfileFormProvider.Provider,
    Form: {
        mapFields: mapProfileFormFields,
        SELECTOR_OPTIONS,
    },
};
export type * from './profile/profile.types';
export type * as ProfileType from './profile/profile.types';

/** SSP **/
import SSPContext from './ssp/SSPProvider';

export const SSP = {
    Provider: SSPContext.Provider,
    useContext: SSPContext.useContext,
};
export type * from './ssp/types';
export type * as SSPType from './ssp/types';
