const DEFAULT_STATE = null;
import {
	SET_USER, CLEAR_USER
} from '../actions/actionTypes';

const user = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_USER:
			return action.user;
		case CLEAR_USER:
			localStorage.removeItem('user');
			return null;
		default:
			return state;
	}
}

export default user;