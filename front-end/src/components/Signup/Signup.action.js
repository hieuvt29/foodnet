import $ from 'jquery';
import { showInfo } from '../Info/Info.action';

export const doSignup = (value) => (dispatch, getState) => {
	$.post('/user', {
		username: value.username,
		password: value.password,
		hotline: value.phone,
		address: value.address,
		isAgent: value.restaurant
	}, (res) => {
		console.log(res);
		if (res.errorCode !== 0) {
			dispatch(showInfo('Tài khoản đã tồn tại'));
		}
	});
}