import $ from 'jquery';
import { hashHistory } from 'react-router';
import { showInfo } from '../Info/Info.action';
import { setUser } from '../../actions/user';

export const doLogin = (username, password) => (dispatch, getState) => {
	$.post('/login', {username, password}, res => {
		console.log(res);
		if (res.errorCode === 0) {
			const user = res.data;
			dispatch(setUser(user));
			hashHistory.push('/');
		} else {
			dispatch(showInfo('Đăng nhập thất bại'));
		}
	});
}