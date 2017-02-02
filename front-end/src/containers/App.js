import { connect } from 'react-redux';
import App from '../components/App';
import { setInfo } from '../actions/login';

export default connect((state) => ({
	info: state.login.info
}), {
	setInfo
})(App);