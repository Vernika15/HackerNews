import { AnyAction, combineReducers } from 'redux';
import postsSlice from '@store/slices';

// Define action to reset state
export const RESET_STATE = 'RESET_STATE';

// Combine all the reducers
const appReducer = combineReducers({
  posts: postsSlice,
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
