import {AnyAction, combineReducers} from 'redux';
import {apiSlice} from '@api';

// Define action to reset state
export const RESET_STATE = 'RESET_STATE';

// Combine all the reducers
const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

/**
 * Return root reducer
 * Provides method to reset redux state
 * @param state
 * @param action
 */
const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
