import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as dash } from '../components/Dash';
import { reducer as info } from '../components/Info';
import user from './user';
import title from './title';

export default combineReducers({
    routing,
    dash, 
    user, 
    info, title
});