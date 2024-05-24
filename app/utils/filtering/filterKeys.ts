export const filterKeys = (input: any, keys_to_keep: Array<string>) => {
    if (!input) return input;

    let newish;

    if (Array.isArray(input)) {
        newish = [...input];

        for (let i = 0; i < newish.length; i++) {
            newish[i] = filterKeys(newish[i], keys_to_keep);
        }
    } else {
        newish = { ...input };

        for (const key in newish) {
            if (!keys_to_keep.includes(key)) {
                delete newish[key];
            } else if (typeof newish[key] === 'object') {
                newish[key] = filterKeys(newish[key], keys_to_keep);
            }
        }
    }

    return newish;
};
