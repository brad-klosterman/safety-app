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
