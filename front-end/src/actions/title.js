import { SET_TITLE } from './actionTypes';

export const setTitle = title => {
	document.title = title + ' - Foodnet';
	return {
		type: SET_TITLE,
		title
	}
};