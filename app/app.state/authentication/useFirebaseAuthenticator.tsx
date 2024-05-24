import { atomWithStorage, RESET, selectAtom } from 'jotai/utils';
import { useAtomValue, useAtom, useSetAtom, atom } from 'jotai';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseAuth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';

/**
 *  Firebase Authenticator (PhoneLogin)
 *  ---
 *
 **/

const useFirebaseAuthenticator = (props: { onPhoneAuthenticated(token: string): void }) => {
    /** requestOTP() response that hold the function to verify OTP **/
    const [confirmationResult, setConfirmationResult] =
        React.useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

    /**
     *   Firebase Authenticator Action Handler
     *   ---
     *
     **/

    const ActionHandler = {
        async requestOTP(phone_number: string) {
            let success: boolean;
            let error = 'Please Try Again Later.';

            try {
                const response = await FirebaseAuth().signInWithPhoneNumber(phone_number, true);
                success = Boolean(response.verificationId);
                if (success) {
                    setConfirmationResult(response);
                }
            } catch (error_response: any) {
                console.error(error);
                success = false;
                if (typeof error_response?.message === 'string') {
                    error = error_response?.message;
                }
            }

            return success ? { success: true } : { error };
        },
        async verifyOTP(code: string) {
            let success: boolean;
            const error = 'Error Verifying OTP';

            try {
                const response = await confirmationResult?.confirm(code);
                const token = await response?.user.getIdToken();

                if (token) props.onPhoneAuthenticated(token);

                success = Boolean(token);
            } catch (error_response: any) {
                console.error(error_response);
                success = false;
            }

            return success ? { success: true } : { error };
        },
    };

    return {
        ...ActionHandler,
    };
};
/*







/**
 *   Firebase Authenticator Types
 *   ---
 *
 **/

export { useFirebaseAuthenticator };

/**
 * Finishes the sign-in flow. Validates a code that was sent to the user's device.
 *
 * @ param verificationCode The code sent to the users device from Firebase.
 */

/*

====================================================================================================
 ‣ Firebase Authenticator
====================================================================================================

 https://rnfirebase.io/auth/phone-auth

 The Firebase SDK uses device storage to persist the users authenticated state across sessions.
 By deleting the apps data/cache from the device settings, the user is able to clear their state.


 * Firebase Phone Auth is not supported in all countries.

*/

/*



Action Handlers are wrapped in response manager if there are errors..

---
PhoneAuthenticator.Events
---
+ OTP_AUTHENTICATOR_REQUESTED
+ OTP_AUTHENTICATOR_RECEIVED
+ CONFIRM_AUTHENTICATOR_SENT
+ CONFIRM_AUTHENTICATOR_RESPONDED

USER REQUESTS OTP AUTHENTICATION
USER RECEIVES OTP AUTHENTICATION
USER SENDS
OTP AUTHENTICATION SUCCESS
OTP AUTHENTICATION DENIED
OTP AUTHENTICATION ERROR

OTP AUTHENTICATION REQUESTED

*/

// interface EventMap {
//     OTP_REQUESTED: {
//         data: { phone_number: string };
//     };
//     OTP_RECEIVED: undefined;
//     OTP_SENT: { code: string };
//     OTP_VERIFIED: undefined;
//     OTP_DENIED: undefined;
// }

// function onEvent<T>(eventName: string, listener: Listener<T>, emit = true): Disposable {
//     if (!events.has(eventName)) {
//         events.set(eventName, new Event<T>());
//     }
//     return events.get(eventName)!.on(listener, emitCurrentState);
// }

// function useEventListener<K extends keyof ElementEventMap>(
//     eventName: K,
//     handler: (ev: ElementEventMap[K]) => void,
//     options?: Options<Element>
// ): void;

// */
// const auth = getAuth();
// // configure atomWithStorage to use AsyncStorage
// export const userAtom = atomWithStorage<user>('@firebaseUser', undefined, {
//     getItem: (key) => {
//         return AsyncStorage.getItem(key)
//             .then((str) => JSON.parse(str))
//             .catch((err) => {
//                 console.log('Error retrieving value:', err);
//                 return undefined;
//             });
//     },
//     setItem: (key, newValue) => {
//         return AsyncStorage.setItem(key, JSON.stringify(user)).catch((err) => {
//             console.log('Error storing value:', err);
//         });
//     },
//     removeItem: (key) => AsyncStorage.removeItem(key),
//     delayInit: true,
// });
// export function useAuth() {
//     const [user, setUser] = usetom<User>();
//     const [isLoading, setIsLoading] = useState(true);
//     const [isAuthorized, setIsAuthorized] = useState(Boolean(user));
//     useEffect(() => {
//         const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 // User is signed in, see docs for a list of available properties
//                 // https://firebase.google.com/docs/reference/js/firebase.User
//                 setUser(user);
//             } else {
//                 // overwriting user here will cause AsyncStorage to overwrite
//             }
//             setIsLoading(false);
//             setIsAuthorized(Boolean(user));
//         });
//
//         return unsubscribeFromAuthStateChanged;
//     }, []);
//
//     return { user, isLoading, isAuthorized };
// }
