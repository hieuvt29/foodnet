import { SET_SEARCH_LIST, SET_SEARCH_LOADING, SET_SEARCH_QUERY } from '../actions/actionTypes';

const DEFAULT_STATE = {
	dishes: [],
	query: '',
	loading: false
}
export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_SEARCH_LOADING:
			return {
				...state,
				loading: action.loading
			}
		case SET_SEARCH_LIST:
			return {
				...state,
				dishes: action.dishes
			}
		case SET_SEARCH_QUERY:
			return {
				...state,
				query: action.query
			}
		default:
			return state;
	}
}