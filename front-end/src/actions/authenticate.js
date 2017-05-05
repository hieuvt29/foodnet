import $ from 'jquery';
import { push } from 'react-router-redux';
import { showInfo } from './info';
import { setUser } from './user';

export const doLogin = (username, password) => (dispatch, getState) => {
	$.post('/login', {username, password}, res => {
		if (res.errorCode === 0) {
			const user = res.data;
			dispatch(setUser(user));
			dispatch(push('/'));
		} else {
			dispatch(showInfo('Đăng nhập thất bại'));
		}
	});
}