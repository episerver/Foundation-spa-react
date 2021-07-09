import { Context } from 'react';
import SettingsApi from '../SettingsApi';
export declare const SettingsContext: Context<SettingsApi | undefined>;
/**
 * React Hook (for functional components) to retrieve the Episerver Context from
 * the nearest Provider in the virtual dom.
 *
 * @returns  { SettingsApi }
 */
export declare function useSettingsApi(): SettingsApi;
export default SettingsContext;
