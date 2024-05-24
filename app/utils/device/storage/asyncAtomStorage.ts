import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

/**
 * Async Storage
 * ---
 * Asynchronous, unencrypted, persistent, key-value storage.
 * In order to store object data, you need to serialize
 *
 * Jotai: preserve state between user sessions
 * https://jotai.org/docs/utilities/storage
 *
 */
function asyncAtomStorage<T>(key: string, initial_value: T) {
    return atomWithStorage<T>(key, initial_value, {
        ...createJSONStorage(() => AsyncStorage),
    });
}

export { asyncAtomStorage };
