import { SHOW_INFO, CLOSE_INFO } from '../../actions/actionTypes';

export const showInfo = (content) => ({
	type: SHOW_INFO,
	content
});

export const closeInfo = () => ({
	type: CLOSE_INFO
});