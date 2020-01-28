import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware))(createStore);

function configureStore(initialState?: {}) {
    return createStoreWithMiddleware(rootReducer, initialState);
}

export const store = configureStore();