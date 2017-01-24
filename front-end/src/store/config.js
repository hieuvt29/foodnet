import { createStore, applyMiddleware, compose } from 'redux';
import combineReducer from '../reducers/index';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducer, {}, composeEnhancers(
    applyMiddleware(thunk, logger)
));

export default store;
