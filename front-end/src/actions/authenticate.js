import $ from 'jquery';
import { hashHistory } from 'react-router';

export const setDoing = (doing) => ({
	type: 'SET_DOING',
	doing
});

export const setStatus = (status) => ({
	type: 'SET_STATUS',
	status
});

export const doLogin = (username, password) => (dispatch, getState) => {
	dispatch(setStatus(''));
	// Do login here
	$.post('/login', {
		username, password
	}, data => {
		dispatch(setDoing(false))
		if (data.errorCode === 0) {
			localStorage.setItem('user', JSON.stringify(data.data));
			hashHistory.push('/');
		} else {
			dispatch(setStatus('Tài khoản hoặc mật khẩu không đúng!'));
		}
	});
	dispatch(setDoing(true));
}

export const doSignup = (username, password, address, hotline, isAgent) => 
	(dispatch, getState) => {
		const signup = getState().signup;
		// Do signup here
		dispatch(setDoing(true));
		$.post('/users', {
			username, password, address, hotline, isAgent
		}, data => {
			dispatch(setDoing(false));
			if  (data.errorCode === 0) {
				dispatch(setStatus('Đăng ký thành công'));
				setTimeout(() => hashHistory.push('/login'), 500);
			} else {
				dispatch(setStatus('Tài khoản đã tồn tại'));
			}
		});
	}