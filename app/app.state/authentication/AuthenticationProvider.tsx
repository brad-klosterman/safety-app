import React, { useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';

import { useEventManager, useEvent } from '@events';
import { createContextProvider } from '@utils';

import {
    AUTHENTICATION_TOKEN_STORAGE_ATOM,
    useAuthenticationStorage,
} from './authentication.storage';
import { useFirebaseAuthenticator } from './useFirebaseAuthenticator';
import type { AuthenticationContextValue, AuthenticationState } from './type.Authentication';

/**
 *   Application Authentication Manager
 *   ---
 *
 *
 *   Authentication State
 *
 *         - initializing - The authentication token has not yet been sent for validation.
 *         - unauthenticated_device - The authentication token is not available in device storage.
 *         - unauthenticated_user - The UserAPI responded with unauthenticated token.
 *         - authenticated_session - The User's Profile is available in device storage
 *         ---
 *
 *   Firebase Authenticator
 *
 *         - Allows users to sign in to Firebase using their phone as the authenticator.
 *         - An SMS message is sent to the user via their phone number containing a unique code.
 *         - Once the code has been authorized, the user is able to sign in to Firebase.
 *         ---
 */

const [AuthenticationContext, useAuthenticationContext] =
    createContextProvider<AuthenticationContextValue>();

function AuthenticationProvider(props: { children: React.ReactNode }) {
    /**
     *   Authentication State
     *   ---
     **/
    const [state, setState] = useState<AuthenticationState>('initializing');

    /**
     *   Authentication Device Storage
     *   ---
     *
     *      stored_token
     *          get the initial value, if value verify user account
     **/

    const stored_token = useAtomValue(AUTHENTICATION_TOKEN_STORAGE_ATOM);
    const storeToken = useSetAtom(AUTHENTICATION_TOKEN_STORAGE_ATOM);

    /**
     *   Event Manager
     *   ---
     **/

    const { sendEvent } = useEventManager();

    useEvent(
        'USER_AUTHENTICATED',
        React.useCallback(
            async (eventName, eventData) => {
                await storeToken(eventData.token);

                setState('authenticated_session');
            },
            [storeToken]
        )
    );

    React.useEffect(() => {
        // todo: this needs to be an initiate event
        if (stored_token) {
            sendEvent('PHONE_AUTHENTICATED', { token: stored_token });
        }
    }, [sendEvent, stored_token]);

    /**
     *   Firebase Authenticator (PhoneLogin)
     *   ---
     **/

    const FirebaseAuthenticator = useFirebaseAuthenticator({
        onPhoneAuthenticated(token) {
            sendEvent('PHONE_AUTHENTICATED', { token });
        },
    });

    /**
     *   Action Handler
     *   ---
     **/

    const ActionHandler = {
        async requestOTP(phone_number: string) {
            return await FirebaseAuthenticator.requestOTP(phone_number);
        },
        async verifyOTP(code: string) {
            return await FirebaseAuthenticator.verifyOTP(code);
        },
    };

    return (
        <AuthenticationContext.Provider value={{ state, action: ActionHandler }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}

export default {
    Provider: AuthenticationProvider,
    useContext: useAuthenticationContext,
};

/*

====================================================================================================
 ‣ Application Authentication Manager
====================================================================================================


When the app opens we validate the user by just fetching the user,
if response returns an error we un-authenticate the device and log the user out application.

there are potentially other reasons why the fetch user request would fail other than invalid token.
we need to ensure the user's token is truly invalid before invalidating the device.
401
---


 Firebase Phone Authenticator

 https://rnfirebase.io/auth/phone-auth

 The Firebase SDK uses device storage to persist the users authenticated state across sessions.
 By deleting the apps data/cache from the device settings, the user is able to clear their state.


 * Firebase Phone Auth is not supported in all countries.

*/
