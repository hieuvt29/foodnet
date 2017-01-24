import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { setUsername, setPassword, setLoginType, 
	setAddress, setHotline, doSignup } 
	from '../actions/signup';

export default connect((state) => ({
	status: state.signup.status,
	doing: state.signup.doing
}), {
	setUsername, setPassword, setLoginType, setAddress, setHotline,
	doSignup: () => doSignup
})(Signup)