/**
 *  Event
 *
 *
 */

/**
 * Emits the supplied event. Additional arguments supplied to `emit` will be
 * passed through to each of the registered listeners.
 *
 * If a listener modifies the listeners registered for the same event, those
 * changes will not be reflected in the current invocation of `emit`.
 */

/**
 * EventEmitter manages listeners and publishes events to them.
 *
 * EventEmitter accepts a single type parameter that defines the valid events
 * and associated listener argument(s).
 *
 * @example
 *
 *   const emitter = new EventEmitter<{
 *     success: [number, string],
 *     error: [Error],
 *   }>();
 *
 *   emitter.on('success', (statusCode, responseText) => {...});
 *   emitter.emit('success', 200, '...');
 *
 *   emitter.on('error', error => {...});
 *   emitter.emit('error', new Error('Resource not found'));
 *
 */

/**
 * Registers a listener that is called when the supplied event is emitted.
 * Returns a subscription that has a `remove` method to undo registration.
 */

/**
 * @param emitter - The event emitter that registered this
 *   subscription
 * @param subscriber - The subscriber that controls
 *   this subscription
 * @param listener - Function to invoke when the specified event is
 *   emitted
 * @param context - Optional context object to use when invoking the
 *   listener
 */
// new (
//     emitter: EventEmitter,
//     subscriber: EventSubscriptionVendor,
//     listener: () => any,
//     context: any
// ): EmitterSubscription;

// interface Event<T> {}

/*







connect(APPLICATION_STATE_EVENTS, {
    subscribe(EventHandler.APPLICATION_ACTIVE)
})




====================================================================================================
 Event
====================================================================================================




Event  represents a single event within the EventEmitter.


Event<T> {
    listeners = new Set<Listener<T>>();

*/
