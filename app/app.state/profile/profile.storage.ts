import { useAtomValue, useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { asyncAtomStorage } from '@device';

import type { UserProfileModel } from './profile.types';

/** Async Storage Atoms **/
export const USER_PROFILE_STORAGE_ATOM = asyncAtomStorage<UserProfileModel | null>(
    'profile_storage',
    null
);

export const USER_ONBOARDED_STORAGE_ATOM = asyncAtomStorage<{
    user_onboarded: boolean;
} | null>('user_onboarded', {
    user_onboarded: false,
});

/** Storage Provider */
const useProfileStorage = () => {
    const profile = useAtomValue(USER_PROFILE_STORAGE_ATOM);
    const updateProfile = useSetAtom(USER_PROFILE_STORAGE_ATOM);
    const resetProfile = async () => await updateProfile(RESET);

    const onboarded_storage = useAtomValue(USER_ONBOARDED_STORAGE_ATOM);
    const updateOnboardedStatus = useSetAtom(USER_ONBOARDED_STORAGE_ATOM);
    const resetOnboardedStatus = async () => await updateOnboardedStatus(RESET);

    async function reset() {
        await resetProfile();
        await resetOnboardedStatus();
    }

    return {
        profile,
        updateProfile,
        onboarded: onboarded_storage?.user_onboarded,
        updateOnboardedStatus,
        reset,
    };
};

/** Exports */
export { useProfileStorage };

/*

const PROFILE_STORAGE_LISTENER_ATOM = atom<{
    USER_REGISTERED: (() => void)[];
}>({
    USER_REGISTERED: [],
});


const listeners = useAtomValue(PROFILE_STORAGE_LISTENER_ATOM);

    React.useEffect(() => {
        listeners.USER_REGISTERED.forEach((callback) => {
            //callback(get, set, newVal, prevVal);
        });
    }, [data]);

    function useListener(callback: ListenerAtomCallback<ProfileStorageContext>) {
        const setListeners = useSetAtom(PROFILE_STORAGE_LISTENER_ATOM);

        React.useEffect(() => {
            setListeners((prev) => [...prev, callback]);
            return () =>
                setListeners((prev) => {
                    const index = prev.indexOf(callback);
                    return [...prev.slice(0, index), ...prev.slice(index + 1)];
                });
        }, [setListeners, callback]);
    }

    function subscribe() {
        return useListener;
    }
 */
