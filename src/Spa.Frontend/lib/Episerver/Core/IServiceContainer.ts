export enum DefaultServices
{
    ContentDeliveryApi = 'ContentDeliveryAPI'
}

export default interface IServiceContainer
{
    /**
     * Add a service to the container if has not been added before
     * 
     * @param {string} key      The identifier in the container
     * @param {object} service  The actual service implementation
     */
    addService<T>(key: string, service: T) : IServiceContainer

    /**
     * Add or update a service to the container
     * 
     * @param {string} key      The identifier in the container
     * @param {object} service  The actual service implementation
     */
    setService<T>(key: string, service: T) : IServiceContainer

    /**
     * Check if a service key has been registered
     * 
     * @param {string} key      The identifier of the container
     */
    hasService(key: string) : boolean

    /**
     * Retrieve a service by name
     * 
     * @param   {string}    key      The service name
     * @returns {object}    The service (not checked by implementation)
     */
    getService<T>(key: string) : T

    /**
     * Extend an existing service by applying the members of the provided
     * object on the existing service. Use carefully as this could overwrite
     * or corrupt the state of an object. If used correctly it can be used
     * to create a runtime object composed from multiple types.
     * 
     * @param {string} key          The service name
     * @param {object} extension    The extension to be added to the object
     */
    extendService<T>(key: string, extension: T) : IServiceContainer
}