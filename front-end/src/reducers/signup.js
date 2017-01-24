const DEFAULT_STATE = {
	loginType: 0,
	username: '',
	password: '',
	address: '',
	hotline: '',
	status: '',
	doing: false
}

export default function login(state = DEFAULT_STATE, action) {
	switch (action.type) {
		case 'SET_USERNAME':
			return {
				...state,
				username: action.username
			};
		case 'SET_PASSWORD':
			return {
				...state,
				password: action.password
			};
		case 'SET_LOGIN_TYPE':
			return {
				...state,
				loginType: action.loginType
			};
		case 'SET_ADDRESS':
			return {
				...state,
				address: action.address
			};
		case 'SET_HOTLINE':
			return {
				...state,
				hotline: action.hotline
			};
		case 'SET_STATUS':
			return {
				...state,
				status: action.status
			};
		case 'SET_DOING':
			return {
				...state,
				doing: action.doing
			};
		default: 
			return state;
	}
}