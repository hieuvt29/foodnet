import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { doSignup } from '../actions/authenticate';

export default connect((state) => ({
	status: state.authenticate.status,
	doing: state.authenticate.doing
}), {
	doSignup
})(Signup)