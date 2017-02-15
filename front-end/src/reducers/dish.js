const DEFAULT_STATE = {
	status: '',
	dishes: [],
	doing: false,
	page: 0,
	loading: false
};

const dish = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case 'SET_DISH_DOING':
			return {
				...state,
				doing: action.doing
			}
		case 'SET_DISH_STATUS':
			return {
				...state,
				status: action.status
			}
		case 'SET_DISH_LIST':
			return {
				...state,
				dishes: action.dishes
			}
		case 'INCREASE_PAGE':
			return {
				...state,
				page: state.page + 1
			}
		case 'RESET_PAGE':
			return {
				...state,
				page: 0
			}
		case 'SET_DISH_LOADING': 
			return {
				...state,
				loading: action.loading
			}
		default: 
			return state;
	}
}

export default dish;