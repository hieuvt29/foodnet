import { connect } from 'react-redux';
import AddDish from '../components/AddDish';
import {setStatus, addDish} from '../actions/dish';

export default connect((state) => ({
	doing: state.dish.doing,
	status: state.dish.status
}), {
	addDish,
	setStatus
})(AddDish);