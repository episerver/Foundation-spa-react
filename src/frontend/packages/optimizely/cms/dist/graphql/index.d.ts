export * from './client';
export * as Types from './types';
import Client from './client';
import type { ClientConfiguration } from './types';
export type ClientSetupMethod = (config?: Partial<ClientConfiguration>) => Client;
export declare const setup: ClientSetupMethod;
