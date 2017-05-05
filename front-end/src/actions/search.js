import { SET_SEARCH_LIST, SET_SEARCH_LOADING, SET_SEARCH_QUERY } from './actionTypes';
import $ from 'jquery';
import { push } from 'react-router-redux';

export const setSearchList = dishes => ({
	type: SET_SEARCH_LIST,
	dishes
});

export const setSearchLoading = loading => ({
	type: SET_SEARCH_LOADING,
	loading
})

export const setSearchQuery = query => ({
	type: SET_SEARCH_QUERY,
	query
});

export const search = query => (dispatch, getState) => {
	dispatch(setSearchLoading(true));
	dispatch(setSearchQuery(query));
	dispatch(push(`/search/${query}`))
	$.get(`/dishes?query=${query}`, data => {
		dispatch(setSearchLoading(false));
		dispatch(setSearchList(data.data));
	});
} 
