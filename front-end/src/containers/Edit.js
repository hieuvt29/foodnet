import { connect } from 'react-redux';
import Edit from '../components/Edit';
import { editDish, setStatus } from '../actions/dish';

export default connect((state) => ({
	doing: state.dish.doing,
	status: state.dish.status
}), {
	editDish,
	setStatus
})(Edit);