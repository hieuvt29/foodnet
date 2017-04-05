import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import combineReducer from '../reducers/index';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

const middlewareRouter = routerMiddleware(hashHistory);
const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducer, {}, composeEnhancers(
    applyMiddleware(thunk, logger, middlewareRouter)
));

export default store;