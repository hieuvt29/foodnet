const DEFAULT_STATE = {
	name: '',
	price: 0,
	description: '',
	image: '',
	status: '',
	doing: false,
	id: 0
};

const dish = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case 'SET_DISH_NAME':
			return {
				...state,
				name: action.name
			}
		case 'SET_DISH_PRICE':
			return {
				...state,
				price: action.price
			}
		case 'SET_DISH_DESCRIPTION':
			return {
				...state,
				description: action.description
			}
		case 'SET_DISH_IMAGE':
			return {
				...state,
				image: action.image
			}
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
		case 'SET_DISH_ID':
			return {
				...state,
				id: action.id
			}
		default: 
			return state;
	}
}

export default dish;