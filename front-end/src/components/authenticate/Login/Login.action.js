import $ from 'jquery';
import {
	LOGIN_SET_USERNAME,
	LOGIN_SET_PASSWORD
} from '../../../actions/actionTypes';

export const setUsername = (username) => ({
	type: LOGIN_SET_USERNAME,
	username
});

export const setPassword = (password) => ({
	type: LOGIN_SET_PASSWORD,
	password
});

export const doLogin = () => (dispatch, getState) => {
	const login = getState().login;
	$.post('/login', login, res => {
		console.log(res);
	});
}