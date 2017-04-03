import { connect } from 'react-redux';
import Signup from './Signup.component';
import {
	doSignup
} from './Signup.action';

export default connect(state => ({
}), {
	doSignup
})(Signup);