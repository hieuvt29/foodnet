import { connect } from 'react-redux';
import AddDish from './AddDish.component';
import { addDish } from './AddDish.action';

export default connect(state => ({

}), {
	addDish
})(AddDish);