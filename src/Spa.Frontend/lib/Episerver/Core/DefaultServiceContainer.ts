import IServiceContainer from './IServiceContainer';

export default class DefaultServiceContainer implements IServiceContainer
{
    protected services : { [key: string] : any } = {};

    public addService<T> (key: string, service: T)
    {
        if (this.services[key]) {
            throw new Error(`The service ${ key } has already been registered`);
        }
        this.services[key] = service;
        return this;
    }

    public setService<T> (key: string, service: T)
    {
        this.services[key] = service;
        return this;
    }

    public hasService(key: string)
    {
        return this.services[key] !== undefined;
    }

    public getService<T>(key: string) : T
    {
        if (this.hasService(key)) {
            return this.services[key] as T;
        }
        throw new Error(`The service ${ key } has not been registered in the container.`);
    }

    public extendService<T>(key: string, service: T)
    {
        if (!this.hasService(key)) {
            throw new Error('Cannot extend an unknown service');
        }
        this.services[key] = Object.assign(this.services[key], service);
        console.warn(`Extended service ${ key }:`,this.services[key]);

        return this;
    }
}