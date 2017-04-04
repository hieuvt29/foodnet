import { SET_TITLE } from '../actions/actionTypes';

export default function (state = 'Trang chủ', action) {
	switch (action.type) {
		case SET_TITLE:
			return action.title;
		default:
			return state;
	}
}