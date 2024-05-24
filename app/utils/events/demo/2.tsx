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

type EventName = EventMap['eventName'];

function connect() {
    return {
        sendEvent() {
            //const items = listeners.current[eventName] || {};
        },
        on<TEventName extends EventName>(eventName: TEventName, callback) {
            // if (connectedCallback) {
            //     throw Error('Cannot add the handler twice.');
            // }
            // if (event !== 'connected') {
            //     throw Error('Only "connected" event is supported.');
            // }
            // connectedCallback = callback;
        },
        disconnect() {
            //clearTimeout(timeout);
        },
    };
}

function useEventManager(props: { eventSource: string }) {
    const connect = React.useCallback(() => connect(), []);

    return { connect };
}

function useEvent(props: { eventName: string }) {
    const connect = React.useCallback(() => connect(), []);

    return { connect };
}

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
    sendEvent<
        TEventName extends EventMap['eventName'],
        TEvent extends Extract<EventMap, { eventName: TEventName }>
    >(eventName: TEventName, eventData: TEvent['eventData']) {
        // this event has just happened so lets broadcast it
        console.log('sendEvent', eventName, eventData);
    },
};
