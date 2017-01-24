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

export const setAddress = (address) => ({
	type: 'SET_ADDRESS',
	address
});

export const setHotline = (hotline) => ({
	type: 'SET_HOTLINE',
	hotline
});

export const setStatus = (status) => ({
	type: 'SET_STATUS',
	status
});

export const setDoing = (doing) => ({
	type: 'SET_DOING',
	doing
});

export const doSignup = (dispatch, getState) => {
	const signup = getState().signup;
	// Do login here
	console.log('Signup information', signup);
	dispatch(setDoing(true));
	setTimeout(() => {
		dispatch(setStatus('Tài khoản đã tồn tại'));
		dispatch(setDoing(false));
	}, 1000);	
}