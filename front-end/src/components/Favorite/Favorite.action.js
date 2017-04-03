import $ from 'jquery';
import deepCopy from '../../utils/deep-copy';
import { setUser }  from '../../actions/user';
import { showInfo } from '../Info/Info.action';

export const removeFavorite = id => (dispatch, getState) => {
	const user = deepCopy(getState().user);
	user.interests.splice(user.interests.map(d => d._id).indexOf(id), 1);
	dispatch(setUser(user));
	$.post('/agent/dish/interest', {
		id
	}, data => {
		if (data.errorCode === 0) {
			dispatch(showInfo('Đã loại bỏ khỏi danh sách yêu thích'));
		}
	})
}