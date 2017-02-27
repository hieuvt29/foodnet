import {
	LOGIN_SET_USERNAME,
	LOGIN_SET_PASSWORD
} from '../../../actions/actionTypes';

const DEFAULT_STATE = {
	username: '',
	password: ''
};

const login = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case LOGIN_SET_USERNAME: 
			return {
				...state, 
				username: action.username
			}
		case LOGIN_SET_PASSWORD: 
			return {
				...state,
				password: action.password
			}
		default: 
			return state;
	}
}

export default login;