import React from 'react';

/**
 *  Event Management & Distribution OG
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

// function useEventListener<K extends keyof ElementEventMap>(
//     eventName: K,
//     handler: (ev: ElementEventMap[K]) => void,
//     options?: Options<Element>
// ): void;

type EventHandlerA = {
    [TEvent in EventMap as TEvent['eventName']]: TEvent extends { eventData: infer TData }
        ? TData
        : never;
};

type EventHandlerB = {
    [TEvent in EventMap as TEvent['eventName']]: (
        payload: Extract<TEvent, { eventName: TEvent['eventName'] }>
    ) => Promise<unknown>;
};

type EventHandlerMap<TEvent extends { eventName: string }> = {
    [TName in TEvent['eventName']]: (
        payload: Extract<TEvent, { eventName: TName }>
    ) => Promise<unknown>;
};

const event_handlers: EventHandlerB = {
    PHONE_AUTHENTICATED: async ({ eventData }) => {
        const toke = eventData.authorization_token;
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
