import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { doLogout } from '../actions/authenticate';

export default connect((state) => ({

}), {
	doLogout
})(Navbar)