import React from 'react';

import API from '@api';
import { useEventManager, useEvent } from '@events';
import { createContextProvider } from '@utils';

import type { ProfileContextValue, UserProfileModel } from '../profile/profile.types';
import { useProfileStorage } from './profile.storage';

/**
 *   User Profile Context Provider
 *   ---
 *
 **/

const [ProfileContext, useProfileContext] = createContextProvider<ProfileContextValue>();

function ProfileProvider(props: { children: React.ReactNode }) {
    /**
     *   Profile Device Storage
     *   ---
     **/
    const ProfileStorage = useProfileStorage();

    /**
     *  Event Manager
     *   ---
     **/ /*  USER_ONBOARD_COMPLETE, USER_PROFILE_UPDATED  */
    const { sendEvent } = useEventManager();

    useEvent(
        'PHONE_AUTHENTICATED',
        React.useCallback(
            async (eventName, eventData) => {
                const token = eventData.token;

                await API.verifyAccount(token).then(async (profile) => {
                    if (profile) {
                        sendEvent('USER_AUTHENTICATED', { profile, token });
                        await ProfileStorage.updateProfile(profile);
                    }
                });
            },
            [sendEvent, ProfileStorage]
        )
    );

    /**
     *  Action Handler
     *   ---
     **/ /*  LOGOUT_USER, UPDATE_USER_PROFILE  */

    return (
        <React.Suspense fallback={<></>}>
            <ProfileContext.Provider
                value={{
                    profile: ProfileStorage.profile,
                    onboarded: ProfileStorage.onboarded,
                    security_password_options: [],
                }}
            >
                {props.children}
            </ProfileContext.Provider>
        </React.Suspense>
    );
}

export default {
    Provider: ProfileProvider,
    useContext: useProfileContext,
};

// import React from 'react';
//
// import { useProfileStorage } from './profile.storage';
// import type { AuthenticationState } from '../authentication/type.Authentication';
// import type { UserProfileModel } from './types/User.types';
//
// /**
//  * User Context
//  *
//  **/
//
// type EventType = {
//     eventName: 'USER_AUTHENTICATED';
//     eventData: { user_profile: UserProfileModel };
// };
//
// const useProfileContext = () => {
//     /** Device Storage */
//     const ProfileStorage = useProfileStorage();
//
//     /** Action Handlers */
//     async function updateProfileStorage(profile: UserProfileModel) {
//         await ProfileStorage.updateProfile(profile);
//         //EventEmitter.emit({ type: 'USER_PROFILE_UPDATED', data: profile });
//     }
//     async function updateProfileOnboardedStatus(user_onboarded: boolean) {
//         await ProfileStorage.updateOnboardedStatus({
//             user_onboarded,
//         });
//         if (user_onboarded) {
//             //EventEmitter.emit({ type: 'USER_PROFILE_ONBOARDED' });
//         }
//     }
//     async function logout() {
//         // await resetDeviceStorage();
//         // await resetSeonAuthorizationStorage();
//         // await resetThemeStorage();
//         // await setProfile(RESET);
//         // await resetOnboardStorage();
//         // await firebase_auth().signOut();
//         // Updates.reloadAsync();
//     }
//
//     /** Event Handlers **/
//     async function onAuthenticationStatusChanged(params: { data: AuthenticationState }) {
//         if (params.data === 'unauthenticated_device') {
//             await ProfileStorage.reset();
//         }
//     }
//
//     /** Event Observers **/
//     //const { useEvent } = EventEmitter.subscribe(KEY);
//
//     // useEvent({
//     //     type: 'AUTHENTICATION_STATUS_CHANGED',
//     //     callback: React.useCallback(() => onAuthenticationStatusChanged, []),
//     // });
//
//     return {
//         profile: ProfileStorage.profile,
//         onboarded: ProfileStorage.onboarded,
//         security_password_options: [],
//         action: {
//             updateProfileStorage,
//             updateProfileOnboardedStatus,
//             logout,
//         },
//         // subscribe: EventEmitter.subscribe,
//         // emit: EventEmitter.emit,
//     };
// };
//
// export default { useContext: useProfileContext };
//
// /**
//  *  Event Manager
//  *   -----
//  *
//  **/
// //const { onEvent } = eventManager.connect('UseProfile');
//
// // React.useEffect(() => {
// //     return onEvent('USER_AUTHENTICATED', (eventName, eventData) => {
// //         console.log('onEvent', eventName, eventData);
// //     });
// // }, [onEvent]);
