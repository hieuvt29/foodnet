import { connect } from 'react-redux';
import Navbar from './Navbar.component';
import { logout } from '../../actions/user';

export default connect(state => ({
	user: state.user,
	title: state.title
}), {
	logout
})(Navbar);