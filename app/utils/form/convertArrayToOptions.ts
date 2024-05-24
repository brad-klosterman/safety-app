import { isNull } from '../assertions';

type SelectorValue = string | number | null;

interface SelectorOption<T extends SelectorValue> {
    label: string;
    value: T;
}
/**
 * Converts an Array of string values in Select Options
 * @param values_array
 */

const convertArrayToOptions = <T extends SelectorValue>(values_array: T[]) => {
    if (!values_array) return [];
    return values_array.reduce(
        (formatted_options: Array<SelectorOption<T>>, option): Array<SelectorOption<T>> => {
            return [
                ...formatted_options,
                { label: isNull(option) ? '' : option.toString(), value: option },
            ];
        },
        []
    );
};

export { convertArrayToOptions };
