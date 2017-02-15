import { connect }  from 'react-redux';
import Loading from '../components/Loading';

export default connect(state => ({
	doing: state.dish.doing
}), {

})(Loading);

