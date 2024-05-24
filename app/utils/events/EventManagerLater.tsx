import React from 'react';
// import { UserProfileModel } from '../../app.state/profile/types/UserModel';

/**
 *  Management & Distribution of Events
 *   -----
 *
 *      Event Transmissions
 *        ---
 *         - EventSource  - connectEventManager( enable ) production of events =>
 *              ( transmitted across broadcast channels )
 *
 *         - sendEvent(EventChannel) { launches the event across the transmisssion phaseses }
 *        ---
 *
 *
 *
 **/

type EventMap =
    | {
          eventName: 'PHONE_AUTHENTICATED';
          eventData: { authorization_token: string };
      }
    | {
          eventName: 'USER_AUTHENTICATED';
          eventData: { user_profile: any };
      };

type EventHandlerMap<TEvent extends { eventName: string }> = {
    [TName in TEvent['eventName']]: (
        payload: Extract<TEvent, { eventName: TName }>
    ) => Promise<unknown>;
};

const event_handlers: EventHandlerMap<EventMap> = {
    PHONE_AUTHENTICATED: async (eventData) => {
        return null;
    },
    USER_AUTHENTICATED: async (eventData) => {
        return null;
    },
};

const dispatch = (event: EventMap) =>
    (
        event_handlers[event.eventName] as (
            params: Extract<EventMap, { eventName: (typeof event)['eventName'] }>
        ) => Promise<boolean>
    )(event);
/*

OG

type EventMap =
    | {
          eventName: 'PHONE_AUTHENTICATED';
          eventData: { authorization_token: string };
      }
    | {
          eventName: 'USER_AUTHENTICATED';
          eventData: { user_profile: UserProfileModel };
      };

type EventHandlerMap<TEvent extends { eventName: string }> = {
    [TName in TEvent['eventName']]: (
        payload: Extract<TEvent, { eventName: TName }>
    ) => Promise<unknown>;
};

const event_handlers: EventHandlerMap<EventMap> = {
    PHONE_AUTHENTICATED: async (eventData) => {
        return null;
    },
    USER_AUTHENTICATED: async (eventData) => {
        return null;
    },
};

const dispatch = (event: EventMap) =>
    (
        event_handlers[event.eventName] as (
            params: Extract<EventMap, { eventName: (typeof event)['eventName'] }>
        ) => Promise<boolean>
    )(event);

 */

const EventManager = {};

interface EventManager {
    sendEvent<
        TEventName extends EventMap['eventName'],
        TEvent extends Extract<EventMap, { eventName: TEventName }>
    >(): EventArg<TEventName, TEvent['eventData']>;
}

// const connect = React.useCallback(
//     <TName extends EventName, TEvent extends Extract<EventMap, { eventName: TName }>>(
//         eventName: TName
//     ) => {
//         ///
//     },
//     []
// );
//
// const sendEvent = React.useCallback(<TName extends EventName>(eventName: TName) => {
//     const event = eventMap.current[eventName];
//
//     return event as any;
// }, []);
//
// const onEvent = <
//     TEventName extends EventName,
//     TEvent extends Extract<EventMap, { eventName: TEventName }>
// >(
//     eventName: TEventName,
//     ...args: TEvent['data'] extends undefined ? [] : [payload: TEvent['data']]
// ) => {
//     // multiple listeners cansubscribe to the same event
//     const items = listeners.current[eventName] || {};
// };

type EventArg<TName extends EventMap['eventName'], TData = undefined> = {
    readonly eventName: TName;
} & (undefined extends TData
    ? { readonly eventData?: Readonly<TData> }
    : { readonly eventData: Readonly<TData> });

// type EventHandler<
//     TName extends EventName,
//     TEvent extends Extract<EventMap, { eventName: TName }>
// > = (e: EventArg<Extract<TName, string>, TEvent['data']>) => void;

/*

function onEvent<T>(eventName: string, listener: Listener<T>, emit = true): Disposable {
    if (!events.has(eventName)) {
        events.set(eventName, new Event<T>());
    }
    return events.get(eventName)!.on(listener, emitCurrentState);
}

interface EventHandler<T = unknown> {
    (event: T): void;



/**
 * Listener function type, called when an event has occurred.
 */
// export interface Listener<T = unknown> {
//     (event: T): void;
// }

/*

interface EventInterface<TEventName extends EventName, TEventHandler> {
    getEvent: () => TEventName;
    getHandler: () => TEventHandler;
}

type GetHandler<T> = T extends EventInterface<any, infer TEventHandler> ? TEventHandler : never;


const EventManager = {
    eventMap: new Map<EventName, Event>(),
    connectEvent<TName extends EventName>(
        eventName: TName,
        eventHandler: EventHandler<TName>
        //data: Extract<EventMap, { eventName: TName }>
    ) {
        console.log(eventName, eventHandler);
        //EventManager.createEvent();
        // subscribe, listen
        // onEvent(event, callback)
    },
    sendEvent<TName extends EventName, TEvent extends Extract<EventMap, { eventName: TName }>>(
        eventName: TName,
        eventModel: TEvent
    ) {
        console.log(eventName, eventModel);
    },
};


 */

/**
 *  Management & Distribution of Events
 *   -----
 *
 *      Event Transmissions
 *        ---
 *         - EventSource  - connectEventManager( enable ) production of events =>
 *              ( transmitted across broadcast channels )
 *
 *         - sendEvent(EventChannel) { launches the event across the transmisssion phaseses }
 *        ---
 *
 *
 *
 **/

/**
 * Connect to the Event Manager
 **/

/*



*/

/**
 * Authentication Event Manager
 **/

// declare global {
//     // eslint-disable-next-line @typescript-eslint/no-namespace
//     namespace ReactNavigation {
//         // eslint-disable-next-line @typescript-eslint/no-empty-interface
//         interface RootParamList {}
//
//         // eslint-disable-next-line @typescript-eslint/no-empty-interface
//         interface Theme {}
//     }
// }

// const EventManagerDemp = {
//     onEvent<TName extends EventName>(eventName: TName, data: EventMap[TName]) {
//         console.log(eventName, data);
//         /*
//         send to  EventListener
//             - listens out for the event happening
//             - can be attached to an event.
//         EventHandler
//         - property of EventListener
//         - when the listener recieves an event the event handler is the code that is run in responsse to the event happening
//         - listener The function to be called when the event is emitted.
//
//         function onEvent<T>(eventName: string, listener: Listener<T>, emit = true): Disposable {
//             if (!events.has(eventName)) {
//                 events.set(eventName, new Event<T>());
//             }
//             return events.get(eventName)!.on(listener, emitCurrentState);
//         }
//
//
//          */
//     },
// };

/**
 *  Management & Distribution of Events
 *   -----
 *
 *      Event Transmissions
 *        ---
 *         - EventSource  - connectEventManager( enable ) production of events =>
 *              ( transmitted across broadcast channels )
 *
 *         - sendEvent(EventChannel) { launches the event across the transmisssion phaseses }
 *        ---
 *
 *
 *
 **/

/*

type Route =
    | {
    route: "/";
    search: {
        page: string;
        perPage: string;
    };
}
    | { route: "/about" }
    | { route: "/admin" }
    | { route: "/admin/users" };

type RoutesObject = {
    [R in Route as R["route"]]: R extends { search: infer S } ? S : never;
};



 */

/**  onEvent()
 **/

/**  sendEvent()

 SIMPLE

 public emit<T>(eventName: E, data: T): void {
    if (this.events.has(eventName)) {
      this.events.get(eventName)!.emit(data);
    }
  }

 public emit(data: T) {
    this.#listeners.forEach(listener => listener(data));

    if (this.#listenersOncer.size > 0) {
      const toCall = this.#listenersOncer;
      this.#listenersOncer = new Set<Listener<T>>();
      toCall.forEach(listener => listener(data));
    }
    this.#previousData = data;
  }

 ALI

 emit(event, ...data) {
        if (this.eventMap.has(event)) {
            this.eventMap.get(event).forEach(callback => {
                setTimeout(() => callback(...data), 0);
            });
        }
    }


 **/
/**
 * Attaches a listener function to an event.
 * @param eventName The name of the event.
 * @param listener The function to be called when the event is emitted.
 * @returns A Disposable which can be used to remove the listener.
 */
/**
 * @param eventName -
 *   The name of the event.
 * @param subscriber -
 *   The subscriber that controls this subscription
 * @param eventHandler -
 *   Function to invoke when the specified event is emitted
 * @param context -
 *   Optional context object to use when invoking the listener
 */

// interface EventManager {
//     send<TEventName extends EventName, TEvent extends Extract<EventMap, { eventName: TEventName }>>(
//         options: {
//             type: TEventName;
//             target?: string;
//         } & (TEvent['canPreventDefault'] extends true ? { canPreventDefault: true } : {}) &
//             (undefined extends TEvent['data']
//                 ? { data?: TEvent['data'] }
//                 : { data: TEvent['data'] })
//     ): EventArg<TEventName, TEvent['data']>;
// }
