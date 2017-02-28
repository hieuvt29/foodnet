import {
	SIGNUP_SET_USERNAME,
	SIGNUP_SET_PASSWORD,
	SIGNUP_SET_RESTAURANT,
	SIGNUP_SET_PHONE,
	SIGNUP_SET_ADDRESS,
	SIGNUP_SET_STATUS
} from '../../actions/actionTypes';

const DEFAULT_STATE = {
	restaurant: false,
	username: '',
	password: '',
	phone: '',
	address: '',
	status: ''
}

const signup = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SIGNUP_SET_RESTAURANT: 
			return {
				...state,
				restaurant: action.restaurant
			}
		case SIGNUP_SET_USERNAME:
			return {
				...state,
				username: action.username
			}
		case SIGNUP_SET_PASSWORD:
			return {
				...state,
				password: action.password
			}
		case SIGNUP_SET_PHONE:
			return {
				...state,
				phone: action.phone
			}
		case SIGNUP_SET_ADDRESS: 
			return {
				...state,
				address: action.address
			}
		case SIGNUP_SET_STATUS: 
			return {
				...state,
				status: action.status
			}
		default: 
			return state;
	}
}

export default signup;