import { connect } from 'react-redux';
import Edit from '../components/Edit';
import {setName, setPrice, setStatus, 
	 setDescription, setImage, 
	 editDish, setDishId } from '../actions/dish';

export default connect((state) => ({
	doing: state.dish.doing,
	status: state.dish.status
}), {
	setName, setPrice, setDescription, setImage,
	editDish: () => editDish,
	setStatus, setDishId
})(Edit);