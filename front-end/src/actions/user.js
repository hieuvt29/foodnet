import $ from 'jquery';
import { SET_USER, CLEAR_USER } from './actionTypes';
import { hashHistory } from 'react-router';
import { showInfo } from './info';

export const setUser = (user) => ({
	type: SET_USER,
	user
})

export const clearUser = () => ({
	type: CLEAR_USER
})

export const logout = () => (dispatch, getState)=> {
	console.log('Logout');
	$.get('/logout', data => {
		hashHistory.push('/login');
		dispatch(clearUser());
	});
}

export const updateInfo = (value) => (dispatch, getState) => {
	const id = getState().user._id;
	$.ajax({
		url: '/user',
		type: 'PUT',
		data: {
			id,
			hotline: value.phone,
			address: value.address
		},
		success: data => {
			console.log(data);
			if (data.errorCode === 0) {
				dispatch(setUser(data.data));
				dispatch(showInfo('Cập nhật thành công'));
			}
		}
	});
}

export const updatePassword = (oldPassword, newPassword) => (dispatch, getState) => {
	$.post('/user/change-password', { 
		password: oldPassword,
		newPassword
	}, data => {
		if (data.errorCode === 0) {
			dispatch(showInfo('Cập nhật mật khẩu thành công'));
		} else {
			dispatch(showInfo('Mật khẩu cũ không đúng'));
		}
	});
}