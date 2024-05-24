/**
 *   EventManager
 *   ---
 *    Management & Distribution of Events
 *   ---
 **/
import React from 'react';
/*
function connect() {
    // A real implementation would actually connect to the server
    let connectedCallback;
    let timeout;
    return {
        sendEvent() {
            timeout = setTimeout(() => {
                if (connectedCallback) {
                    connectedCallback();
                }
            }, 100);
        },
        on(event, callback) {
            if (connectedCallback) {
                throw Error('Cannot add the handler twice.');
            }
            if (event !== 'connected') {
                throw Error('Only "connected" event is supported.');
            }
            connectedCallback = callback;
        },
        disconnect() {
            clearTimeout(timeout);
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
*/
function Application() {
    /**
     *   ---
     *    Application Event Manager
     *   ---
     *
     **/
    // const EventManager = useEventManager({
    //     eventSource: 'Application',
    // });

    //const { sendEvent } = EventManager.connect();

    return <></>;
}

// React.useEffect(() => {
//     const connection = createConnection(serverUrl, roomId);
//     connection.on('connected', () => {
//         showNotification('Connected!', theme);
//     });
//     connection.connect();
//     return () => connection.disconnect();
// }, [roomId, theme]);

// export { EventManager };

/*==================================================================================================
    EventManager ===================================================================================
 */

// interface EventHandler<T = unknown> {
//     (event: T): void;
// }
//
// const eventListeners = new Map<string, number>();
//
// export type { EventHandler };

// openConnection(
// sendEvent

// messages are delivered

// The EventListener listens out for the event happening,
// The EventHandler is the code that is run in response to it happening.

/** EventSource opens connection to capture events **/
// handleSentEvents  sendEvent  handleEvents
// EventSource.addEventListener("message", (e) => {
//     console.log(e.data);
// });

// Emits the event with the provided data only if the data has changed.
// let listeners = []
// function emitChange() {
//     // for (const listener of eventListeners) {
//     //     listener();
//     // }
// }

/*

====================================================================================================
 Application Event Manager
====================================================================================================

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

//onEvent To react to an event, you attach an EventHandler to it.
//subscribe(listener)

// type RouterFactory<
//     State extends NavigationState,
//     Action extends NavigationAction,
//     RouterOptions extends DefaultRouterOptions
// > = (options: RouterOptions) => Router<State, Action>;
