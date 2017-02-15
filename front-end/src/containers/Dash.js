import { connect } from 'react-redux';
import Dash from '../components/Dash';
import {
	loadDish, loadMore,
	commentDish,
	likeDish, dislikeDish
} from '../actions/dish';

export default connect((state) => ({
	dishes: state.dish.dishes,
	loading: state.dish.loading
}), {
	loadDish, loadMore,
	commentDish,
	likeDish, dislikeDish
})(Dash);