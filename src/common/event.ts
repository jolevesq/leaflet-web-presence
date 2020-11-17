import Vue from 'vue';

export enum GlobalEvents {
    /**
     * Fires when the map is created
     * Payload: (map)
     */
    MAP_CREATED = 'map/created',
}

// private for EventBus internals, so don't export
// a simple data structure for managing the Event API on fixtures.
// TODO if we end up supporting toggle/disabled events, add an active boolean flag to the structure
class EventHandler {
    eventName: string;
    handlerName: string;
    handlerFunc: Function;

    constructor (eName: string, hName: string, handler: Function) {
        this.eventName = eName;
        this.handlerName = hName;
        this.handlerFunc = handler;
    }
}

export class EventAPI {
    /**
     * A vue instance that provides an event bus for all events.
     *
     * @private
     * @type {Vue}
     * @memberof EventAPI
     */
    private readonly _eventBus: Vue;

    constructor() {
        this._eventBus = new Vue();
    }

    /**
     * Adds an event handler to an event.
     *
     * @param {string} event name of the event to react to
     * @param {Function} callback function to execute when event triggers
     * @param {string} [handlerName] name of the handler (for reference). a name will be generated if not provided.
     * @returns {string} the handler name
     * @memberof EventAPI
     */
    on(event: string, callback: Function) {
        this._eventBus.$on(event, callback);
    }

    // /**
    //  * Removes an event handler from an event.
    //  *
    //  * @param {string} handlerName name of the handler to remove
    //  * @memberof EventAPI
    //  */
    // off(handlerName: string): void {
    //     // TODO support other overloads? like event name + handler function?
    //     // TODO handle the "off all" scenario?
    //     // TODO support "turn off all handlers for an event?".
    //     //      This is a bit tricky as it also uses a 1 string param sig.
    //     //      Could use a diff method, like .allOff(event)

    //     // check if name exists. if not... do nothing? console warn? error?
    //     const eh = this.findHandler(handlerName);

    //     if (eh) {
    //         // remove from event bus and the registry
    //         this._eventRegister.splice(this._eventRegister.indexOf(eh), 1);
    //         this._eventBus.$off(eh.eventName, eh.handlerFunc);
    //     }

    //     // TODO case where no handler was found. do nothing? console warn? error?
    //     //      for now just exit. the goal was achived (non-existing handler will no longer react)
    // }

    /**
     * Triggers an event.
     *
     * @param {string} event the name of the event
     * @param {...any[]} args any arguements the event is expecting
     * @memberof EventAPI
     */
    emit(event: string, ...args: any[]): void {
        this._eventBus.$emit(event, ...args);
    }
}