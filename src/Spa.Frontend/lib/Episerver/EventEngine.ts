//Create context
declare let global : any;
declare let window : any;
var ctx : any = window || global || {};
ctx.EpiserverSpa = ctx.EpiserverSpa || {};

/**
 * A generic definition for an event listener
 */
interface IListener {
    id: string
    callback: () => void
}

/**
 * The store of registered listeners
 */
interface IListenerStore {
    [ event: string ]:  Array<IListener>
}

/**
 * Main descriptor of the EventEngine, as provided by the Episerver SPA
 * framework
 */
export interface IEventEngine {
    /**
     * Register an event so it can be dispatched and caught by the engine
     * 
     * @param event The event code to register
     */
    registerEvent(event: string) : IEventEngine

    /**
     * The listener to attach
     * 
     * @param event 
     * @param id 
     * @param handler 
     */
    addListener(event: string, id: string, handler: () => void, autoRegister?: boolean) : IEventEngine

    /**
     * Dispatch an event
     * 
     * @param event 
     * @param args 
     */
    dispatch(event: string, ...args: any[]) : void

    removeListener(event: string, id: string) : IEventEngine
}

class EventEngine implements IEventEngine
{
    protected listeners : IListenerStore
    protected events: Array<string>

    public constructor()
    {
        this.listeners = {};
        this.events = [];

        if (ctx.addEventListener) {
            ctx.addEventListener("message", this.onPostMessageReceived.bind(this), false);
        }
    }

    protected onPostMessageReceived(event: MessageEvent)
    {
        if (event.data.id) {
            if (this.registerEvent(event.data.id)) {
                this.dispatch(event.data.id, event.data.data);
            }
            if (event.data.id != '/site/checksize') {
                console.log("POSTMESSAGEEVENT", event);
            }
        }
    }

    public registerEvent(event: string) : IEventEngine
    {
        if (this.events.indexOf(event) == -1) {
            this.events.push(event);
            this.listeners[event] = [];
        }
        return this;
    }

    public hasEvent(event: string) : boolean
    {
        return this.events.indexOf(event) >= 0;
    }

    public addListener(event: string, id: string, handler: () => void, autoRegister: boolean = false) : IEventEngine
    {
        if (!this.hasEvent(event)) {
            if (autoRegister) {
                this.registerEvent(event);
            } else {
                throw `The event ${event} has not been registered.`;
            }
        }
        if (this.listeners[event].some(value => { return value.id == id; })) {
            throw `There's already a listener with id ${id} registered for the event ${event}`;
        }

        this.listeners[event].push({callback: handler, id: id });
        return this;
    }

    public dispatch(event: string, ...args: any[]) : void
    {
        if (!this.hasEvent(event)) {
            this.registerEvent(event);
        }
        this.listeners[event].forEach((l: IListener) => {
            l.callback.apply(ctx, args)
        });
    }

    public removeListener(event: string, id: string) : IEventEngine
    {
        return this;
    }
}

//Add EventEngine to Context
ctx.EpiserverSpa.EventEngine = ctx.EpiserverSpa.EventEngine || new EventEngine();
export default ctx.EpiserverSpa.EventEngine as EventEngine;