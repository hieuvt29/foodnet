import { SHOW_INFO, CLOSE_INFO } from '../actions/actionTypes';

const DEFAULT_STATE = {
	show: false,
	content: ''
}

const info = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SHOW_INFO: 
			return {
				...state,
				show: true,
				content: action.content
			}
		case CLOSE_INFO:
			return {
				...state,
				show: false
			}
		default: 
			return state;
	}
}

export default info;