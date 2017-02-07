import { connect } from 'react-redux';
import Delete from '../components/Delete';
import {setDishId, deleteDish } from '../actions/dish';

export default connect((state) => ({
	doing: state.dish.doing,
	status: state.dish.status
}), {
	deleteDish: () => deleteDish,
	setDishId
})(Delete);