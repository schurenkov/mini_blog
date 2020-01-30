import { combineReducers } from 'redux';
import postState from './post/reducer';
import userState from './user/reducer';

const rootReducer = combineReducers({
  postState,
  userState,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
