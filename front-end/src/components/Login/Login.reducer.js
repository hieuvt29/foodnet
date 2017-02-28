import {
	LOGIN_SET_USERNAME,
	LOGIN_SET_PASSWORD,
	LOGIN_SET_STATUS
} from '../../actions/actionTypes';

const DEFAULT_STATE = {
	username: '',
	password: '',
	status: ''
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
		case LOGIN_SET_STATUS:
			return {
				...state,
				status: action.status
			}
		default: 
			return state;
	}
}

export default login;