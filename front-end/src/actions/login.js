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

export const setLoginStatus = (loginStatus) => ({
	type: 'SET_LOGIN_STATUS',
	loginStatus
});

export const setLogining = (logining) => ({
	type: 'SET_LOGINING',
	logining
});

export const doLogin = (dispatch, getState) => {
	const login = getState().login;
	// Do login here
	// 
	dispatch(setLogining(true));
	dispatch(setLoginStatus('Hello'))
}