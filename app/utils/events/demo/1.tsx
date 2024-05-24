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

const EventManager = {};

function useEvent() {
    const onEvent = <
        TEventName extends EventName,
        TEvent extends Extract<EventMap, { eventName: TEventName }>
    >(
        eventName: TEventName,
        ...args: TEvent['eventData'] extends undefined ? [] : [payload: TEvent['eventData']]
    ) => {
        // multiple listeners cansubscribe to the same event
        //const items = listeners.current[eventName] || {};
    };
    return {};
}
