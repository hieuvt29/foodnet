import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as login } from '../components/authenticate/Login';

export default combineReducers({
    routing,
    login
});