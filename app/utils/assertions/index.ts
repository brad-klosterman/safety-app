/*
  Type assertion allows you to set the type of value and tell the compiler not to infer it.
  This is when you, as a programmer, might have a better understanding of the type of
  variable than what TypeScript can infer on its own.
*/

// Returns true if the specified value is null, false otherwise.
export function isNull(value: unknown): value is null {
    return value === null;
}
export function isUndefined(value: unknown): value is undefined {
    return typeof value === 'undefined' || value === undefined;
}

// Returns true if the specified value is null or undefined, false otherwise.
export function isNil(value: unknown): value is null | undefined {
    return isNull(value) || isUndefined(value);
}

export function isNilOrEmpty(value: unknown) {
    return isNil(value) || value === '';
}

export function isDefined(value: unknown) {
    return typeof value !== 'undefined' && value !== undefined;
}

export function isString(value: unknown): value is string {
    return Object.prototype.toString.call(value) === '[object String]';
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

export function isArray<T>(value: unknown): value is Array<T> {
    return Array.isArray(value);
}

export function isEmptyArray(value: unknown) {
    return isArray(value) && value.length === 0;
}

export function isArrayItems(value: unknown) {
    return isArray(value) && value.length !== 0;
}

export const hasEmptyItem = (array: Array<string | number | null | undefined>) => {
    return array.includes(undefined) || array.includes(null) || array.includes('');
};

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
    return typeof value === 'function';
}

export function isPlainObject(value: unknown): value is Record<string, any> {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }

    const prototype = Object.getPrototypeOf(value);

    return prototype === null || prototype === Object.prototype;
}

export function isPromise(value: any) {
    return !isNil(value) && !isNil(value.then);
}

export function isEmptyNull(obj: object) {
    if (!obj) return true;
    return JSON.stringify(obj) === '{}';
}

export const objectsKeysDiff = (orig: object, updated: object) => {
    return Object.keys(orig).filter((key) => {
        // @ts-ignore
        return orig[key] !== updated[key];
    });
};
