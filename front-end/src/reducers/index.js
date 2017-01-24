import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import login from './login'
import signup from './signup'

const rootReducer = combineReducers({
  	routing: routerReducer,
  	login,
  	signup
});


export default rootReducer
