import { connect } from 'react-redux';
import Favorite from './Favorite.component';
import { removeFavorite } from './Favorite.action';

export default connect(state => ({
	favorite: state.user.interests
}), {
	removeFavorite
})(Favorite);