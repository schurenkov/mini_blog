import { combineReducers } from 'redux';
import postState from './post/reducer';


const rootReducer = combineReducers({
    postState
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
