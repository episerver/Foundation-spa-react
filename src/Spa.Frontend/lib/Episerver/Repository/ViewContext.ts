import { Action, AnyAction } from 'redux';
import EpiContext from '../Spa';

//Build context
declare let global: any;
declare let window: any;
var ctx: any = window || global || {};

/**
 * The list of action keys available for the view context
 */
enum ViewContextActions {
  INIT = '@@EPI/INIT',
  UPDATE_PATH = 'UPDATE_PATH',
}

interface ViewContextState {
  currentPath?: string;
}

/**
 * Action data type for this reducer
 */
export interface ViewContextAction extends Action<ViewContextActions> {
  path?: string;
}

export default class ViewContext {
  public static StateKey: string = 'ViewContext';

  /**
   * Get the state of this reducer from the global state
   *
   * @param state
   */
  protected static getMyState(state: any): ViewContextState {
    return state && state[this.StateKey] ? state[this.StateKey] : {};
  }

  /**
   * Return the redux action to retrieve the current path
   */
  public static getCurrentPath(): (dispatch: (action: AnyAction) => AnyAction, getState: () => any) => string {
    return (dispatch: (action: AnyAction) => AnyAction, getState: () => any): string => {
      let myState = this.getMyState(getState());
      return myState && myState.currentPath ? myState.currentPath : '';
    };
  }

  /**
   * Update the current path
   *
   * @param path
   */
  public static updateCurrentPath(path: string): ViewContextAction {
    return {
      type: ViewContextActions.UPDATE_PATH,
      path: path,
    };
  }

  public static reducer(state: ViewContextState, action: ViewContextAction): ViewContextState {
    switch (action.type) {
      case ViewContextActions.INIT:
        return this.buildInitialState();
      case ViewContextActions.UPDATE_PATH:
        let newState: ViewContextState = Object.assign({}, state, { currentPath: action.path });
        //window.history.pushState(newState, '', SpaContext.config().basePath + action.path);
        return newState;
      default:
        //No action
        break;
    }
    return Object.assign({}, state); //No action, return unmodified
  }

  protected static buildInitialState(): ViewContextState {
    if (EpiContext.isDebugActive()) console.debug('Initializing ViewContext state');
    return {
      currentPath: ctx.location && ctx.location.pathname ? ctx.location.pathname : '',
    };
  }
}
