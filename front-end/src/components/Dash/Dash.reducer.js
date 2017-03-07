import {
	SET_DISHES,
	SET_PAGE
} from '../../actions/actionTypes';

const DEFAULT_STATE = {
	dishes: [],
	page: 0
};

const dash = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_DISHES:
			return {
				...state,
				dishes: action.dishes
			}
		case SET_PAGE:
			return {
				...state,
				page: action.page
			}
		default: 
			return state;
	}
}

export default dash;