import $ from 'jquery';
import {
	SIGNUP_SET_USERNAME,
	SIGNUP_SET_PASSWORD,
	SIGNUP_SET_RESTAURANT,
	SIGNUP_SET_PHONE,
	SIGNUP_SET_ADDRESS,
	SIGNUP_SET_STATUS
} from '../../actions/actionTypes';

export const setRestaurant = (restaurant) => ({
	type: SIGNUP_SET_RESTAURANT,
	restaurant
});

export const setUsername = (username) => ({
	type: SIGNUP_SET_USERNAME,
	username
});

export const setPassword = (password) => ({
	type: SIGNUP_SET_PASSWORD,
	password
});

export const setPhone = (phone) => ({
	type: SIGNUP_SET_PHONE,
	phone
});

export const setAddress = (address) => ({
	type: SIGNUP_SET_ADDRESS,
	address
});

export const setStatus = (status) => ({
	type: SIGNUP_SET_STATUS,
	status
})

export const doSignup = () => (dispatch, getState) => {
	const value = getState().signup;
	$.post('/user', {
		username: value.username,
		password: value.password,
		hotline: value.phone,
		address: value.address,
		isAgent: value.restaurant
	}, (res) => {
		console.log(res);
		if (res.errorCode !== 0) {
			dispatch(setStatus('Tài khoản đã tồn tại'));
		}
	});
}