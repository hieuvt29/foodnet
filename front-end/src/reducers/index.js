import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import title from './title';
import dishes from './dishes';
import info from './info';

export default combineReducers({
    routing,
    dishes, 
    user, 
    info, title
});