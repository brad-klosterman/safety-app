/**
 * Gets the number of existent properties. Undefined and null are considered empty.
 * All strings (even empty), all numbers, objects and false are considered present.
 *
 * NOTE: This only checks the very first layer
 *
 * Example:
 * getNumberOfExistentProperties(
 *  {
 *      a: 5,
 *      b: undefined,
 *      c: null.
 *      d: {
 *          e: 'test',
 *          f: 42
 *      }
 *  }
 * )
 *
 * would return 2 because `a` and `d` are present. `e` and `f` are outside of the first layer, so disregarded.
 */
const getNumberOfExistentProperties = (object: Record<string, any>) => {
    let numberOfExistentProperties = 0;
    for (const [_, value] of Object.entries(object)) {
        if (value === null || value === undefined) {
            continue;
        }
        numberOfExistentProperties++;
    }
    return numberOfExistentProperties;
};

export { getNumberOfExistentProperties };
