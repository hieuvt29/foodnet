import $ from 'jquery';
import { SET_USER, CLEAR_USER } from './actionTypes';
import { hashHistory } from 'react-router';

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