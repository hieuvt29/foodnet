import { connect } from 'react-redux';
import Dash from '../components/Dash';
import {
	loadDish,
	commentDish,
	likeDish, dislikeDish
} from '../actions/dish';

export default connect((state) => ({
	dishes: state.dish.dishes
}), {
	loadDish: () => loadDish,
	commentDish,
	likeDish, dislikeDish
})(Dash);