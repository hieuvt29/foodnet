const DEFAULT_STATE = {
	doing: false,
	status: ''
}

export default function login(state = DEFAULT_STATE, action) {
	switch (action.type) {
		case 'SET_DOING':
			return {
				...state,
				doing: action.doing
			};
		case 'SET_STATUS':
			return {
				...state,
				status: action.status
			};
		default: 
			return state;
	}
}