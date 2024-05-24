import React from 'react';
import {
    createContextProvider,
    useEventManager,
    type EventManagerContext,
    unid,
    EventMap,
    EventHandler,
} from '@utils';

import { type UserProfileModel } from './app.state/profile/profile.types';

/**
 *   Event Management & Distribution
 *   -----
 *
 **/

const [EventsContext, useEventsContext] =
    createContextProvider<EventManagerContext<ApplicationEvent>>();

function EventManager(props: { children: React.ReactNode }) {
    const { connect, sendEvent } = useEventManager<ApplicationEvent>();

    return (
        <EventsContext.Provider value={{ connect, sendEvent }}>
            {props.children}
        </EventsContext.Provider>
    );
}

function useEvent<TEventName extends keyof EventMap<ApplicationEvent>>(
    eventName: TEventName,
    eventHandler: EventHandler<EventMap<ApplicationEvent>, TEventName>
) {
    const { connect } = useEventsContext();

    const { onEvent } = React.useMemo(
        () => ({
            ...connect(unid()),
        }),
        [connect]
    );

    React.useEffect(() => onEvent(eventName, eventHandler), [eventHandler, eventName, onEvent]);
}

/**
 *  Application Events
 *   -----
 *
 **/

type ApplicationEvent =
    | {
          eventName: 'PHONE_AUTHENTICATED';
          eventData: { token: string };
      }
    | {
          eventName: 'USER_AUTHENTICATED';
          eventData: { profile: UserProfileModel; token: string };
      };

export { EventManager, useEventsContext as useEventManager, useEvent };
export type { ApplicationEvent };

/*

PHONE_AUTHENTICATED
- verify user

USER_AUTHENTICATED
- store user profile

*/

/*

function EventManager() {
    const eventMap = React.useRef<Record<EventName, Event & { eventObservers: EventObserver[] }>>(
        Object.create(null)
    );

    const connect = React.useCallback(
        <
            TEventName extends Event['eventName'],
            TEvent extends Extract<Event, { eventName: TEventName }>
        >(
            eventName: TEventName,
            eventObserver: (
                eventName: TEventName,
                ...args: TEvent['eventData'] extends undefined ? [] : [payload: TEvent['eventData']]
            ) => {
                //
            }
        ) => {
            // we have now connected to the event manager
            // the event manager contains a map of events
            // this connection could be one of many for this event
            console.log('connect', eventName, eventObserver);
        },
        []
    );

    return () => {
        //
    };
}

type EventName = Event['eventName'];

type EventObserver = {
    on(): any;
};

 */
// function useEventManager() {
//     const listeners = React.useRef<Record<string, Record<string, Listeners>>>(Object.create(null));
//
//     const connect = React.useCallback((eventObserver: string) => {
//         const removeListener = (type: string, callback: (data: any) => void) => {
//             const callbacks = listeners.current[type]
//                 ? listeners.current[type][eventObserver]
//                 : undefined;
//
//             if (!callbacks) {
//                 return;
//             }
//
//             const index = callbacks.indexOf(callback);
//
//             if (index > -1) {
//                 callbacks.splice(index, 1);
//             }
//         };
//
//         const addListener = (eventName: string, callback: (data: any) => void) => {
//             listeners.current[eventName] = listeners.current[eventName] || {};
//             listeners.current[eventName][eventObserver] =
//                 listeners.current[eventName][eventObserver] || [];
//             listeners.current[eventName][eventObserver].push(callback);
//
//             let removed = false;
//             return () => {
//                 // Prevent removing other listeners when unsubscribing same listener multiple times
//                 if (!removed) {
//                     removed = true;
//                     removeListener(eventName, callback);
//                 }
//             };
//         };
//
//         return {
//             addListener,
//             removeListener,
//         };
//     }, []);
//
//     const sendEvent = React.useCallback(
//         ({
//             eventName,
//             eventData,
//             eventSource,
//         }: {
//             eventName: string;
//             eventData?: any;
//             eventSource?: string;
//         }) => {
//             const items = listeners.current[eventName] || {};
//
//             // Copy the current list of callbacks in case they are mutated during execution
//             const callbacks =
//                 eventSource !== undefined
//                     ? items[eventSource]?.slice()
//                     : ([] as Listeners)
//                           .concat(...Object.keys(items).map((t) => items[t]))
//                           .filter((cb, i, self) => self.lastIndexOf(cb) === i);
//
//             const event: EventArg<any, any> = {
//                 get eventName() {
//                     return eventName;
//                 },
//             };
//
//             if (eventSource !== undefined) {
//                 Object.defineProperty(event, 'eventSource', {
//                     enumerable: true,
//                     get() {
//                         return eventSource;
//                     },
//                 });
//             }
//
//             if (eventData !== undefined) {
//                 Object.defineProperty(event, 'eventData', {
//                     enumerable: true,
//                     get() {
//                         return eventData;
//                     },
//                 });
//             }
//
//             callbacks?.forEach((cb) => cb(event));
//
//             return event as any;
//         },
//         []
//     );
//
//     return React.useMemo(() => ({ connect, sendEvent }), [connect, sendEvent]);
// }
//
// export { useEventManager };
//
// type Listeners = ((e: any) => void)[];
//
// type EventArg<TName extends EventMap['eventName'], Data = undefined> = {
//     readonly eventName: TName;
//     readonly consumer?: string;
// } & (undefined extends Data
//     ? { readonly eventData?: Readonly<Data> }
//     : { readonly eventData: Readonly<Data> });
//
// type EventHandler = {
//     [TEvent in EventMap as TEvent['eventName']]: TEvent extends { onEvent: infer S } ? S : never;
// };

/*






   const connect = React.useCallback(
       <
           TEventName extends EventMap['eventName'],
           TEvent extends Extract<EventMap, { eventName: TEventName }>
       >(
           eventName: TEventName,
           eventObserver: (
               eventName: TEventName,
               ...args: TEvent['eventData'] extends undefined ? [] : [payload: TEvent['eventData']]
           ) => {
               //
           }
       ) => {
           // we have now connected to the event manager
           // the event manager contains a map of events
           // this connection could be one of many for this event
           console.log('connect', eventName, eventObserver);
       },
       []
   );
   */

/* an event can have multiple observers from many sources
                     * multiple sources can observers an event, to dispatchEventHandler from
                     *
                     *  type EventHandler = {
                        [TEvent in EventMap as TEvent['eventName']]: TEvent extends { onEvent: infer S } ? S : never;
                    };
                     * */
//const connect = React.useCallback(() => EventManager.connect, []);

// const EventManager2 = {
//     connect<TEventName extends EventName, TEvent extends Extract<Event, { eventName: TEventName }>>(
//         eventName: TEventName,
//         eventObserver: {
//             onEvent: (
//                 eventName: TEventName,
//                 ...args: TEvent['eventData'] extends undefined ? [] : [payload: TEvent['eventData']]
//             ) => {
//                 /* an event can have multiple observers from many sources
//                  * multiple sources can observers an event, to dispatchEventHandler from
//                  * */
//                 // type EventHandler = {
//                 //     [TEvent in EventMap as TEvent['eventName']]: TEvent extends { onEvent: infer S } ? S : never;
//                 // };
//             };
//         }
//     ) {
//         // we have now connected to the event manager
//         // the event manager contains a map of events
//         // this connection could be one of many for this event
//         console.log('connect', eventName, eventObserver);
//     },
//     sendEvent<
//         TEventName extends EventName,
//         TEvent extends Extract<Event, { eventName: TEventName }>
//     >(eventName: TEventName, eventData: TEvent['eventData']) {
//         // this event has just happened so lets broadcast it
//         console.log('sendEvent', eventName, eventData);
//     },
// };

// const Context = React.createContext<typeof EventManager>(EventManager);
//
// type EventManagerContextType = ReturnType<typeof React.createContext<typeof useEventManager>>;
// const EventManagerContext: EventManagerContextType = React.createContext<typeof useEventManager>(useEventManager);
//
// type Listeners = ((e: any) => void)[];

// export default {
//     Provider: EventProvider,
//     useManager() {
//         return React.useContext(Context);
//     },
// };

// interface EventObserver {
//     eventName: EventName;
// }
//
// type EventHandler = {
//     [TEvent in EventMap as TEvent['eventName']]: TEvent extends { onEvent: infer S } ? S : never;
// };

// type EventManager = {
//     connect(eventName)
// }

// type EventEmitter = {
//     connect: <TEventMap extends EventMapBase>(target: string) => EventConsumer<TEventMap>;
//     /**
//      * Emit an event to child screens.
//      *
//      * @param options.type Type of the event (e.g. `focus`, `blur`)
//      * @param [options.data] Optional information regarding the event.
//      * @param [options.target] Key of the target route which should receive the event.
//      * If not specified, all routes receive the event.
//      */
//     emit<EventName extends Keyof<EventMap>>(
//         options: {
//             type: EventName;
//             target?: string;
//         } & (EventMap[EventName]['canPreventDefault'] extends true
//             ? { canPreventDefault: true }
//             : {}) &
//             (undefined extends TEventMap[EventName]['data']
//                 ? { data?: TEventMap[EventName]['data'] }
//                 : { data: TEventMap[EventName]['data'] })
//     ): EventArg<EventName, TEventMap[EventName]['canPreventDefault'], TEventMap[EventName]['data']>;
//
//     send<
//         EventName extends EventMapBase,
//         TEvent extends Extract<EventMap, { eventName: TEventName }>
//     >(): EventArg<TEventName, TEvent['data']>;
// };

/**
 *  Event Manager
 *   -----
 *
 *      Listeners
 *        ---
 *         connectEventManager( enable ) production of events =>
 *              ( transmitted across broadcast channels )
 *
 *         - sendEvent(EventChannel) { launches the event across the transmission phase }
 *        ---
 *
 *
 *
 **/

// type EventConsumer<EventMap extends EventMapBase> = {
//     /**
//      * Subscribe to events from the parent navigator.
//      *
//      * @param type Type of the event (e.g. `focus`, `blur`)
//      * @param callback Callback listener which is executed upon receiving the event.
//      */
//     addListener<EventName extends Keyof<EventMap>>(
//         type: EventName,
//         callback: EventListenerCallback<EventMap, EventName>
//     ): () => void;
//     removeListener<EventName extends Keyof<EventMap>>(
//         type: EventName,
//         callback: EventListenerCallback<EventMap, EventName>
//     ): void;
// };
//

//
// type Keyof<T extends Record<string, unknown>> = Extract<keyof T, string>;
//
// type EventMapCore<State extends 'enabled'> = {
//     focus: { data: undefined };
//     blur: { data: undefined };
//     state: { data: { state: State } };
//     beforeRemove: { data: { action: NavigationAction }; canPreventDefault: true };
// };
//
// type EventArg<
//     EventName extends string,
//     CanPreventDefault extends boolean | undefined = false,
//     Data = undefined
// > = {
//     /**
//      * Type of the event (e.g. `focus`, `blur`)
//      */
//     readonly type: EventName;
//     readonly target?: string;
// } & b(CanPreventDefault extends true
//     ? {
//           readonly defaultPrevented: boolean;
//           preventDefault(): void;
//       }
//     : Record<string, unknown>) &
//     (undefined extends Data
//         ? { readonly data?: Readonly<Data> }
//         : { readonly data: Readonly<Data> });
//
// type EventListenerCallback<EventMap extends EventMapBase, EventName extends keyof EventMap> = (
//     e: EventArg<
//         Extract<EventName, string>,
//         EventMap[EventName]['canPreventDefault'],
//         EventMap[EventName]['data']
//     >
// ) => void;
//
// type NavigationAction = Readonly<{
//     /**
//      * Type of the action (e.g. `NAVIGATE`)
//      */
//     type: string;
//     /**
//      * Additional data for the action
//      */
//     payload?: object;
//     /**
//      * Key of the route which dispatched this action.
//      */
//     source?: string;
//     /**
//      * Key of the navigator which should handle this action.
//      */
//     target?: string;
// }>;
//
// type ActionCreators<Action extends NavigationAction> = {
//     [key: string]: (...args: any) => Action;
// };

/**
 *  Event Transmissions
 *   -----
 *
 *      Event
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

// type EventChannel =
//     | {
//           eventChannel: 'AUTHENTICATION';
//           events: {
//               phone_authenticated: { eventData: { toke: string } };
//           };
//       }
//     | {
//           eventChannel: 'USER_PROFILE';
//           onEvent(eventData: { user_profile: UserProfileModel }): Promise<void>;
//       };

/**
 *  Event Manager
 *   -----
 *
 *      connect(eventName)
 *        ---
 *         - onEvent(EventChannel) {  }
 *        ---
 *
 *        const { sendEvent } = EventManager.connect( )
 *
 **/
// React.useEffect(() => {
//     const unsubscribeFocus = navigation.addListener('focus', () =>
//         setIsFocused(true)
//     );
//
//     const unsubscribeBlur = navigation.addListener('blur', () =>
//         setIsFocused(false)
//     );
//
//     return () => {
//         unsubscribeFocus();
//         unsubscribeBlur();
//     };
// }, [navigation]);

// function EventManager() {
//     const eventMap = React.useRef<Record<EventName, Event & { eventObservers: EventObserver[] }>>(
//         Object.create(null)
//     );
//
//     const connect = React.useCallback(
//         <
//             TEventName extends Event['eventName'],
//             TEvent extends Extract<Event, { eventName: TEventName }>
//         >(
//             eventName: TEventName,
//             eventObserver: (
//                 eventName: TEventName,
//                 ...args: TEvent['eventData'] extends undefined ? [] : [payload: TEvent['eventData']]
//             ) => {
//                 //
//             }
//         ) => {
//             // we have now connected to the event manager
//             // the event manager contains a map of events
//             // this connection could be one of many for this event
//             console.log('connect', eventName, eventObserver);
//         },
//         []
//     );
//
//     return () => {
//         //
//     };
// }
