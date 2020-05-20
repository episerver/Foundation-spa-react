import { Action, AnyAction } from 'redux';

/**
 *
 */
export enum RepositoryActions {
  INIT = '@@EPI/INIT',
}

/**
 *
 */
export interface RepositoryAction<ActionEnum, RepositoryType> extends Action<ActionEnum> {
  item?: RepositoryType;
  error?: string;
  args?: Array<any>;
}

export type DispatchMethod<T> = (
  action: RepositoryAction<any, any> | DispatchableMethod<T>,
) => RepositoryAction<any, any> | T;
export type DispatchableMethod<T> = (dispatch: DispatchMethod<T>, getState: () => any) => T;
