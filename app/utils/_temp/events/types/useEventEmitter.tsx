import * as React from 'react';

import type {
    UseEventProps,
    EventArg,
    EventConsumer,
    EventEmitter,
    EventListeners,
    Keyof,
} from './types';

/**
 * Hook to manage the event system used to notify components of various events.
 */
function useEventEmitter<TEventMap extends Record<string, any>>(): EventEmitter<TEventMap> & {
    subscribe: (target: string) => EventConsumer<TEventMap>;
} {
    const listeners = React.useRef<Record<string, Record<string, EventListeners>>>(
        Object.create(null)
    );

    const subscribe = React.useCallback<(consumer: string) => EventConsumer<TEventMap>>(
        (consumer: string) => {
            const removeListener = (type: string, callback: (data: any) => void) => {
                const callbacks = listeners.current[type]
                    ? listeners.current[type][consumer]
                    : undefined;

                if (!callbacks) return;

                const index = callbacks.indexOf(callback);

                if (index > -1) callbacks.splice(index, 1);
            };

            const addListener = (type: string, callback: (data: any) => void) => {
                listeners.current[type] = listeners.current[type] || {};
                listeners.current[type][consumer] = listeners.current[type][consumer] || [];
                listeners.current[type][consumer].push(callback);

                let removed = false;
                return () => {
                    // Prevent removing other listeners when unsubscribing same listener multiple times
                    if (!removed) {
                        removed = true;
                        removeListener(type, callback);
                    }
                };
            };

            // check the render lifecycle
            function useEvent<TEventName extends Keyof<TEventMap>>(
                props: UseEventProps<TEventMap, TEventName>
            ) {
                // should we memoize the callback
                React.useEffect(() => addListener(props.type, props.callback), [props.callback]);
            }

            return {
                removeListener,
                addListener,
                useEvent,
            };
        },
        []
    );

    const emit = React.useCallback(
        ({ type, consumer, data }: { type: string; consumer?: string; data?: any }) => {
            const items = listeners.current[type] || {};

            // Copy the current list of callbacks in case they are mutated during execution
            const callbacks =
                consumer !== undefined
                    ? items[consumer]?.slice()
                    : ([] as EventListeners)
                          .concat(...Object.keys(items).map((t) => items[t]))
                          .filter((cb, i, self) => self.lastIndexOf(cb) === i);

            const event: EventArg<any, any> = {
                get type() {
                    return type;
                },
            };

            if (consumer !== undefined) {
                Object.defineProperty(event, 'target', {
                    enumerable: true,
                    get() {
                        return consumer;
                    },
                });
            }

            if (data !== undefined) {
                Object.defineProperty(event, 'data', {
                    enumerable: true,
                    get() {
                        return data;
                    },
                });
            }

            callbacks?.forEach((cb) => cb(event));

            return event as any;
        },
        []
    );

    return React.useMemo(() => ({ subscribe, emit }), [subscribe, emit]);
}

export { useEventEmitter };
