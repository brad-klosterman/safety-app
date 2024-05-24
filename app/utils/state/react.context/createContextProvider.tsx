import React from 'react';

const createContextProvider = <T,>(
    initial_value: T | null = null
): [React.Context<T | null>, () => T] => {
    const context = React.createContext<T | null>(initial_value);

    return [
        context,
        (): T => {
            const context_value = React.useContext(context);

            if (context_value === null) {
                throw new Error(`Context Value is null`);
            }

            return context_value;
        },
    ];
};

export { createContextProvider };
