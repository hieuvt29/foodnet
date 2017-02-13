const DEFAULT_STATE = {
	status: '',
	dishes: [],
	doing: false,
	id: 0
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
		default: 
			return state;
	}
}

export default dish;