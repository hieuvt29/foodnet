import $ from 'jquery';

export const setUsername = (username) => ({
	type: 'SET_USERNAME',
	username
});

export const setPassword = (password) => ({
	type: 'SET_PASSWORD',
	password
});

export const setLoginType = (loginType) => ({
	type: 'SET_LOGIN_TYPE',
	loginType
});

export const setStatus = (status) => ({
	type: 'SET_STATUS',
	status
});

export const setDoing = (doing) => ({
	type: 'SET_DOING',
	doing
});

export const doLogin = (dispatch, getState) => {
	const login = getState().login;
	// Do login here
	$.post('/login', {
		username: login.username,
		password: login.password
	}, (data) => {
		console.log(data);
	});
	dispatch(setDoing(true));
	dispatch(setStatus('Hello'));
}