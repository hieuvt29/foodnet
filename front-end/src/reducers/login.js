const DEFAULT_STATE = {
	loginType: 0,
	username: '',
	password: '',
	status: '',
	doing: false,
	info: null
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
		case 'SET_INFO':
			return {
				...state,
				info: action.info
			};
		default: 
			return state;
	}
}