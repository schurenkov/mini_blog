import { combineReducers } from 'redux';
import postState from './post/reducer';
import authorState from './author/reducer';
import userState from './user/reducer';

const rootReducer = combineReducers({
  postState,
  authorState,
  userState,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
