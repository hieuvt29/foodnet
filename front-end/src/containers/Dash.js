import { connect } from 'react-redux';
import Dash from '../components/Dash';
import { setInfo } from '../actions/login';

export default connect((state) => ({
	info: state.login.info
}), {
	setInfo
})(Dash);