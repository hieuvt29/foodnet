import { connect } from 'react-redux';
import Dash from './Dash.component';
import {
	loadDishes, comment, like, dislike
} from './Dash.action';

export default connect(state => ({
	value: state.dash
}), {
	loadDishes, comment, like, dislike
})(Dash);