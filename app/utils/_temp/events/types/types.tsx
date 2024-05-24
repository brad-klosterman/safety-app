type EventMapBase = Record<string, { data?: any }>;

type EventArg<EventName extends string, Data = undefined> = {
    /**
     * Type of the event
     */
    readonly type: EventName;
    readonly consumer?: string;
} & (undefined extends Data
    ? { readonly data?: Readonly<Data> }
    : { readonly data: Readonly<Data> });

type EventListenerCallback<EventMap extends EventMapBase, EventName extends keyof EventMap> = (
    e: EventArg<Extract<EventName, string>, EventMap[EventName]['data']>
) => void;

type EventConsumer<EventMap extends EventMapBase> = {
    /**
     * Subscribe to events
     *
     * @param type Type of the event
     * @param callback Callback listener which is executed upon receiving the event.
     */
    addListener<EventName extends Keyof<EventMap>>(
        type: EventName,
        callback: EventListenerCallback<EventMap, EventName>
    ): () => void;
    removeListener<EventName extends Keyof<EventMap>>(
        type: EventName,
        callback: EventListenerCallback<EventMap, EventName>
    ): void;
    useEvent<EventName extends Keyof<EventMap>>(props: UseEventProps<EventMap, EventName>): void;
};

type UseEventProps<EventMap extends EventMapBase, EventName extends Keyof<EventMap>> = {
    readonly type: EventName;
    readonly callback: EventListenerCallback<EventMap, EventName>;
};

type EventEmitter<EventMap extends EventMapBase> = {
    /**
     * Emit an event to subscribed components
     *
     * @param options.type Type of the event
     * @param [options.data] Optional information regarding the event.
     * @param [options.consumer] Key of the target consumer which should receive the event.
     * If not specified, all consumer receive the event.
     */
    emit<EventName extends Keyof<EventMap>>(
        options: {
            type: EventName;
            consumer?: string;
        } & (undefined extends EventMap[EventName]['data']
            ? { data?: EventMap[EventName]['data'] }
            : { data: EventMap[EventName]['data'] })
    ): EventArg<EventName, EventMap[EventName]['data']>;
};

type EventListeners = ((e: any) => void)[];

// eslint-disable-next-line @typescript-eslint/ban-types
type Keyof<T extends {}> = Extract<keyof T, string>;

export type {
    EventArg,
    EventConsumer,
    UseEventProps,
    EventEmitter,
    EventListenerCallback,
    EventListeners,
    Keyof,
};
