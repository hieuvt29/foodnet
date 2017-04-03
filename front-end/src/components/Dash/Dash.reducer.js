import {
	SET_DISHES,
	SET_PAGE,
	SET_LOADING
} from '../../actions/actionTypes';

const DEFAULT_STATE = {
	dishes: [],
	page: 0,
	loading: false
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
		case SET_LOADING:
			return {
				...state,
				loading: action.loading
			}
		default: 
			return state;
	}
}

export default dash;