import { connect } from 'react-redux';
import Login from '../components/Login';
import { setUsername, setPassword, setLoginType, doLogin } from '../actions/login.js';

export default connect((state) => ({
	loginStatus: state.login.loginStatus,
	logining: state.login.logining
}), {
	setUsername,
	setPassword,
	setLoginType,
	doLogin: () => doLogin
})(Login)