import { connect } from 'react-redux';
import Login from '../components/Login';
import { doLogin } from '../actions/authenticate';

export default connect((state) => ({
	status: state.authenticate.status,
	doing: state.authenticate.doing
}), {
	doLogin
})(Login);
