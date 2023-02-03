import type { FunctionComponent, PropsWithChildren, ComponentProps } from 'react';
import type { OptimizelyCmsProps } from './cms';
import type { OptimizelyEditModeProps } from './edit-mode';
import { SWRConfig } from 'swr';
export { useOptimizelyCms } from './cms';
export { useEditMode, useContentEditMode } from './edit-mode';
export type OptimizelyCmsContextProps = OptimizelyCmsProps & OptimizelyEditModeProps & {
    swrOptions?: SWROptions;
};
export type SWROptions = ComponentProps<typeof SWRConfig>["value"];
export declare const OptimizelyCmsContext: FunctionComponent<PropsWithChildren<OptimizelyCmsContextProps>>;
export default OptimizelyCmsContext;
