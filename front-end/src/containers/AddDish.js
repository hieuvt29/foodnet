import { connect } from 'react-redux';
import AddDish from '../components/AddDish';
import {setName, setPrice, setStatus, 
	 setDescription, setImage, addDish} from '../actions/dish';

export default connect((state) => ({
	info: state.login.info,
	doing: state.dish.doing,
	status: state.dish.status
}), {
	setName, setPrice, setDescription, setImage,
	addDish: () => addDish,
	setStatus
})(AddDish);