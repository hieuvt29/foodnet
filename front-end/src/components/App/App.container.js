import { connect } from 'react-redux';
import App from './App.component';

export default connect(state => ({
	user: state.user
}), {

})(App);