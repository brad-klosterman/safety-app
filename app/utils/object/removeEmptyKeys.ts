function removeEmptyKeys<T extends object>(object: T): T {
    return (Object.keys(object) as Array<keyof T>).reduce((acc: T, key) => {
        if (object[key] !== null && object[key] !== undefined && object[key] !== '') {
            acc[key] = object[key];
        }

        return acc;
    }, {} as T);
}

export { removeEmptyKeys };
