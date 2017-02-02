import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login';
import signup from './signup';
import dish from './dish';

const rootReducer = combineReducers({
  	routing: routerReducer,
  	login,
  	signup, dish
});

export default rootReducer
