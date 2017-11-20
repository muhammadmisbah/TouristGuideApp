import {createStore, combineReducers, 
    applyMiddleware
} from 'redux';
import {createLogger} from 'redux-logger';
import user from './reducers/user';
import places from './reducers/place';
import marker from './reducers/marker'
import thunk from 'redux-thunk';

let store = createStore(
    combineReducers({
       user,
       places,
       marker,
    }),
    {},
    applyMiddleware(createLogger(), thunk)
);

export default store;