import { connect } from 'react-redux'; 
import Login from './Login.component';
import { setUsername, setPassword, doLogin } from './Login.action'

export default connect(state => ({
	value: state.login
}), {
	setUsername,
	setPassword,
	doLogin
})(Login);