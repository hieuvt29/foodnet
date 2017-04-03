import { connect } from 'react-redux'; 
import Login from './Login.component';
import { doLogin } from './Login.action'

export default connect(state => ({
}), {
	doLogin
})(Login);