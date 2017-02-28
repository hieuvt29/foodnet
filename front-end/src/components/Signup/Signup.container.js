import { connect } from 'react-redux';
import Signup from './Signup.component';
import {
	setRestaurant,
	setUsername,
	setPassword,
	setPhone,
	setAddress,
	setStatus,
	doSignup
} from './Signup.action';

export default connect(state => ({
	value: state.signup
}), {
	setRestaurant,
	setUsername,
	setPassword,
	setPhone,
	setAddress,
	doSignup,
	setStatus
})(Signup);