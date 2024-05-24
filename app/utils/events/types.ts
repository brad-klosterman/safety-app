/**
 *   Event Manager Type
 *   ---
 **/

interface Event {
    eventName: string;
    eventData?: any;
}

type EventMapBase = Record<string, Event>;

type EventMap<TEvent extends Event> = {
    [TEventName in TEvent['eventName']]: Extract<TEvent, { eventName: TEventName }> & {
        observers: { id: string; eventHandler(eventName: string, eventData: any): void }[];
    };
};

type SendEvent<TEvent extends Event> = <TEventName extends keyof EventMap<TEvent>>(
    eventName: TEventName,
    eventData: EventMap<TEvent>[TEventName]['eventData']
) => void;

type OnEvent<TEvent extends Event> = <TEventName extends keyof EventMap<TEvent>>(
    eventName: TEventName,
    eventHandler: EventHandler<EventMap<TEvent>, TEventName>
) => void;

type EventHandler<TEventMap extends EventMapBase, TEventName extends keyof TEventMap> = (
    eventName: TEventName,
    eventData: TEventMap[TEventName]['eventData']
) => void;

type ObserveEvents<TEventType extends Event> = {
    onEvent: OnEvent<TEventType>;
};

type EventManagerContext<TEventType extends Event> = {
    //eventMap?: EventMap<TEventType>;
    sendEvent: SendEvent<TEventType>;
    connect(connection_id: string): ObserveEvents<TEventType>;
};

export type {
    EventMapBase,
    Event,
    EventMap,
    SendEvent,
    EventHandler,
    OnEvent,
    EventManagerContext,
    ObserveEvents,
};

/* Example










*/

// type SendEvent<T> = T extends { eventName: infer IEventName; eventData: infer IEventData }
//     ? (eventName: IEventName, eventData: IEventData) => void
//     : never;

// type TestEventManager = EventManager<TestEvent>;
//
// const testEventManager: TestEventManager = {
//     // eventMap: {},
//     onEvent(event) {
//         if (event.eventName === 'PHONE_AUTHENTICATED') {
//             const { token } = event.eventData;
//         }
//     },
//
//     sendEvent(eventName, eventData) {
//         if (eventName === 'PHONE_AUTHENTICATED') {
//             const { token } = eventData;
//         }
//         if (eventName === 'AUTHENTICATED_DENIED') {
//             const { error_message } = eventData;
//         }
//     },
// };

// type EventHandlerMap<TEvent extends { eventName: string }> = {
//     [TName in TEvent['eventName']]: (
//         payload: Extract<TEvent, { eventName: TName }>
//     ) => Promise<unknown>;
// };

/*

type EventListenerCallback<
    EventMap extends EventMapBase,
    EventName extends keyof EventMap
> = (
    e: EventArg<
        Extract<EventName, string>,
        EventMap[EventName]['canPreventDefault'],
        EventMap[EventName]['data']
    >
) => void;

type GetDataValue<T> = T extends { data: infer TInferredData }
    ? TInferredData
    : never;

emit<EventName extends Keyof<EventMap>>(
    options: {
    type: EventName;
    consumer?: string;
} & (undefined extends EventMap[EventName]['data']
    ? { data?: EventMap[EventName]['data'] }
    : { data: EventMap[EventName]['data'] })
): EventArg<EventName, EventMap[EventName]['data']>;


// dispatchEvent(event: Event): boolean;

type EventHandler = {
    [TEvent in EventMap as TEvent['eventName']]: TEvent extends { onEvent: infer S } ? S : never;
};

type ClickEvent = Extract<Event, { type: 'click' }>;

type EventHandler2 = {
    [TEvent in Event as TEvent['eventName']]: TEvent extends { eventData: infer S } ? S : never;
};

type EventHandlerMap<TEvent extends { eventName: string }> = {
    [TName in TEvent['eventName']]: (
        payload: Extract<TEvent, { eventName: TName }>
    ) => Promise<unknown>;
};

interface EventManager {
    sendEvent<
        TEventName extends EventMap['eventName'],
        TEvent extends Extract<EventMap, { eventName: TEventName }>
    >(): EventArg<TEventName, TEvent['eventData']>;
}

const onEvent = <
    TEventName extends EventName,
    TEvent extends Extract<EventMap, { eventName: TEventName }>
>(
    eventName: TEventName,
    ...args: TEvent['data'] extends undefined ? [] : [payload: TEvent['data']]
) => {
    // multiple listeners cansubscribe to the same event
    const items = listeners.current[eventName] || {};


    type EventArg<TName extends EventMap['eventName'], TData = undefined> = {
        readonly eventName: TName;
    } & (undefined extends TData
        ? { readonly eventData?: Readonly<TData> }
        : { readonly eventData: Readonly<TData> });


    type EventHandler<
        TName extends EventName,
        TEvent extends Extract<EventMap, { eventName: TName }>
    > = (e: EventArg<Extract<TName, string>, TEvent['data']>) => void;

type InferEvent<T extends Event> = T extends { eventData: infer TInferredData }
    ? TInferredData
    : never;

};

type TransformedMap<TEventType extends Event> = {
    [TEvent in TEventType as TEvent['eventName']]: TEvent;
}[TEventType['eventName']];

type TransformedMap2<TEventType extends Event> = TEventType extends infer IEventType
    ? IEventType
    : never;

 */
