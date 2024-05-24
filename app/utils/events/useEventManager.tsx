import React from 'react';
import { EventManagerContext, ObserveEvents } from './types';

import type { Event, EventMap, SendEvent } from './types';

/**
 *  Event Management & Distribution
 *   -----
 *
 **/

function useEventManager<TEventType extends Event>(): EventManagerContext<TEventType> {
    const eventMap = React.useRef<EventMap<TEventType>>(Object.create(null));

    const connect = React.useCallback<(connection_id: string) => ObserveEvents<TEventType>>(
        (connection_id) => ({
            onEvent(eventName, eventHandler) {
                eventMap.current[eventName] = eventMap.current[eventName] || {};
                eventMap.current[eventName].observers = eventMap.current[eventName].observers || [];
                eventMap.current[eventName].observers.push({ id: connection_id, eventHandler });

                let removed = false;
                return () => {
                    if (!removed) {
                        removed = true;

                        const observers = eventMap.current[eventName].observers;
                        const index = observers.findIndex(
                            (observer) => observer.id === connection_id
                        );

                        if (index > -1) {
                            observers.splice(index, 1);
                        }
                    }
                };
            },
        }),
        []
    );

    const sendEvent = React.useCallback<SendEvent<TEventType>>((eventName, eventData) => {
        const event = eventMap.current[eventName];

        if (!event) return;

        const eventHandlers = [...event.observers].map((observer) => observer.eventHandler);

        eventHandlers?.forEach((cb) => cb(eventName, eventData));

        return event;
    }, []);

    return React.useMemo(() => ({ connect, sendEvent }), [connect, sendEvent]);
}

export { useEventManager };

/*
const observeEvent = React.useCallback<OnEvent<TEventType>>((eventName, eventHandler) => {


        eventMap.current[eventName] = eventMap.current[eventName] || {};
        eventMap.current[eventName].observers = eventMap.current[eventName].observers || [];
        eventMap.current[eventName].observers.push({ id: connection_id, eventHandler });

        let removed = false;
        return () => {
            if (!removed) {
                removed = true;

                const observers = eventMap.current[eventName].observers;
                const index = observers.findIndex((observer) => observer.id === connection_id);

                if (index > -1) {
                    observers.splice(index, 1);
                }
            }
        };
    }, []);
 */
