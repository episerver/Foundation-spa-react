import { Reducer, Action, AnyAction } from '@reduxjs/toolkit';

export default interface IStateReducerInfo<S, A extends Action = AnyAction> {
    stateKey : string;
    reducer: Reducer<S, A>
}