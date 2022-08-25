import type { ClientConfiguration, QueryResponse } from './types';
import fetch from 'cross-fetch';
declare type Fetch = typeof fetch extends Promise<infer R> ? R : typeof fetch;
declare type FetchConfig = Parameters<Fetch>[1];
export declare type Response<T = any> = QueryResponse<T, Fetch>;
export declare function validateConfig(config: any): config is ClientConfiguration;
export declare class Client {
    private config;
    protected get debug(): boolean;
    protected get throwOnError(): boolean;
    protected get endpoint(): URL;
    constructor(config: ClientConfiguration);
    query<T = any>(query: string, variables?: Record<string, any>, requestInit?: FetchConfig): Promise<Response<T>>;
    protected log(...args: any[]): void;
    protected logError(...args: any[]): void;
}
export default Client;
