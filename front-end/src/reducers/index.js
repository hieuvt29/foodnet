import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as login } from '../components/Login';
import { reducer as signup } from '../components/Signup';
import { reducer as dash } from '../components/Dash';

export default combineReducers({
    routing,
    login,
    signup,
    dash
});