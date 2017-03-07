import $ from 'jquery';
import { hashHistory } from 'react-router';

import {
	LOGIN_SET_USERNAME,
	LOGIN_SET_PASSWORD,
	LOGIN_SET_STATUS
} from '../../actions/actionTypes';

export const setUsername = (username) => ({
	type: LOGIN_SET_USERNAME,
	username
});

export const setPassword = (password) => ({
	type: LOGIN_SET_PASSWORD,
	password
});

export const setStatus = (status) => ({
	type: LOGIN_SET_STATUS,
	status
});


export const doLogin = () => (dispatch, getState) => {
	const login = getState().login;
	$.post('/login', login, res => {
		console.log(res);
		if (res.errorCode === 0) {
			localStorage.setItem('user', JSON.stringify(res.data));
			hashHistory.push('/');
		} else {
			dispatch(setStatus('Đăng nhập thất bại'));
		}
	});
}