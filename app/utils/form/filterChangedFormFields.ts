import { FieldValues } from 'react-hook-form';

const filterChangedFormFields = <T extends FieldValues>(
    allFields: T,
    dirtyFields: Partial<Record<keyof T, boolean>>
): Partial<T> => {
    return Object.keys(dirtyFields).reduce((acc, currentField) => {
        return {
            ...acc,
            [currentField]: allFields[currentField],
        };
    }, {} as Partial<T>);
};

export { filterChangedFormFields };
