import React from 'react';

/**
 *  Event Management & Distribution
 *   -----
 *
 **/

type EventMap =
    | {
          eventName: 'PHONE_AUTHENTICATED';
          eventData: { authorization_token: string };
      }
    | {
          eventName: 'USER_AUTHENTICATED';
          eventData: { user_profile: { name: string } };
      };

/**
 * Attaches a listener function to an event.
 * @param eventName The name of the event.
 * @param listener The function to be called when the event is emitted.
 * @param emitCurrentState Indicates whether the listener should be called with the previous value of the event.
 * @returns A Disposable which can be used to remove the listener.
 */
// function onEvent<T>(eventName: string, listener: Listener<T>, emit = true): Disposable {
//     if (!events.has(eventName)) {
//         events.set(eventName, new Event<T>());
//     }
//     return events.get(eventName)!.on(listener, emitCurrentState);
// }

let listeners = [];

const store = {
    add() {
        // todos = [...todos, { id: nextId++, text: 'text' + nextId }];
        // emitChange();
    },
    subscribe(listener) {
        listeners = [...listeners, listener];
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    },
    get() {
        return 'todos';
    },
};
