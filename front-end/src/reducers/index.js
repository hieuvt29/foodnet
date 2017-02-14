import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authenticate from './authenticate';
import dish from './dish';

const rootReducer = combineReducers({
  	routing: routerReducer,
  	dish,
  	authenticate
});

export default rootReducer;
