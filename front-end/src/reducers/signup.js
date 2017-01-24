const DEFAULT_STATE = {
	loginType: 0,
	username: '',
	password: ''
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
		default: 
			return state;
	}
}