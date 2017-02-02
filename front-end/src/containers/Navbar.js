import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

export default connect((state) => ({
	info: state.login.info
}), {

})(Navbar)