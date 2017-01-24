const DEFAULT_STATE = {
	loginType: 0,
	username: '',
	password: '',
	loginStatus: '',
	logining: false
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
		case 'SET_LOGIN_STATUS':
			return {
				...state,
				loginStatus: action.loginStatus
			};
		case 'SET_LOGINING':
			return {
				...state,
				logining: action.logining
			};
		default: 
			return state;
	}
}