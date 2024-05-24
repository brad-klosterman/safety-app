/**
 *   -----
 *
 *    SEON SAFETY APPLICATION
 *
 *   -----
 *
 *       Navigation
 *        ---
 *         - Authentication - PhoneLogin OTPVerification
 *         - UserRegistration - ProfileManager configureDevice(Permissions & Settings) onboardUser(ProfileForm)
 *         - AuthenticatedSession - HomeNavbar(MobileAlarm PropertyManager AlarmsManager SettingsProfile)
 *        ---
 *
 * tsx.TopLevel
 **/

/*

====================================================================================================
 ‣ Application
====================================================================================================


import _types from 'jest-worker/build/types';

const messageListener = (request) => {
    switch (request[0]) {
        case _types.CHILD_MESSAGE_INITIALIZE:
            const init = request;
            file = init[2];
            setupArgs = request[3];
            break;

        case _types.CHILD_MESSAGE_CALL:
            const call = request;
            execMethod(call[2], call[3]);
            break;

        case _types.CHILD_MESSAGE_END:
            end();
            break;

        default:
            throw new TypeError('Unexpected request from parent process: ' + request[0]);
    }
};

process.on('message', messageListener);

function reportSuccess(result) {
    if (!process || !process.send) {
        throw new Error('Child can only be used on a forked process');
    }

    process.send([_types.PARENT_MESSAGE_OK, result]);
}

const isPromise = (obj) =>
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function';

function execFunction(fn, ctx, args, onResult, onError) {
    let result;

    try {
        result = fn.apply(ctx, args);
    } catch (err) {
        onError(err);
        return;
    }

    if (isPromise(result)) {
        result.then(onResult, onError);
    } else {
        onResult(result);
    }
}
*/
