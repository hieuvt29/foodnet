import { connect } from 'react-redux';
import Login from '../components/Login';
import { setUsername, setPassword, setLoginType, doLogin } 
	from '../actions/login';

export default connect((state) => ({
	status: state.login.status,
	doing: state.login.doing
}), {
	setUsername,
	setPassword,
	setLoginType,
	doLogin: () => doLogin
})(Login)