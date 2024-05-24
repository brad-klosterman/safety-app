import { useAtomValue, useSetAtom, atom } from 'jotai';
import { RESET, selectAtom } from 'jotai/utils';
import { asyncAtomStorage } from '@device';
import React from 'react';

/** Atoms */
export const AUTHENTICATION_TOKEN_STORAGE_ATOM = asyncAtomStorage<string | null>(
    'authentication_token',
    null
);

/** Storage Provider */
const useAuthenticationStorage = () => {
    const token = useAtomValue(AUTHENTICATION_TOKEN_STORAGE_ATOM);
    const storeToken = useSetAtom(AUTHENTICATION_TOKEN_STORAGE_ATOM);

    const reset = React.useCallback(async () => {
        await storeToken(RESET);
    }, [storeToken]);

    const initiate = React.useCallback(async () => {
        console.log('initiate AuthenticationStorage');
        return token;
    }, [token]);

    return {
        token,
        storeToken,
        initiate,
        reset,
    };
};

export { useAuthenticationStorage };

// const getValue = useAtomCallback(
//     React.useCallback((get) => {
//         const curr = get(AUTHENTICATION_TOKEN_STORAGE_ATOM);
//         console.log('curr', curr);
//         return curr;
//     }, [])
// );

// onLoad: (get: Getter) => Promise<string | null>

// function useSelectAtom(anAtom, keyFn) {
//     return useAtomValue(selectAtom(anAtom, keyFn));
// }
//
// const Component = () => {
//     // how to use it
//
//     const initValue = 10;
//     useSelectAtom(
//         React.useMemo(() => atom(initValue), [initValue]),
//         React.useCallback<(state: { prop: any }) => any>((state) => state.prop, [])
//     );
// };

// import { useAtom } from 'jotai'
// import { focusAtom } from 'jotai-optics'
//
// /* if an atom is created here, please use `useMemo(() => atom(initValue), [initValue])` instead. */
// export function useFocusAtom(anAtom, keyFn) {
//     return useAtom(focusAtom(anAtom, keyFn))
// }
//
// // how to use it
// useFocusAtom(anAtom) {
//     useMemo(() => atom(initValue), [initValue]),
//         useCallback((optic) => optic.prop('key'), [])
// }
