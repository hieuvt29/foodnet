import $ from 'jquery';
import { showInfo } from '../Info/Info.action';
import { hashHistory } from 'react-router';

export const addDish = (value) => (dispatch, getState) => {
	console.log(value);
	$.post('/agent/dishes', {
		name: value.name,
		price: value.price,
		info: value.description,
		img: value.image,
		ingredients: value.ingredients,
		tags: value.tags
	}, data => {
		if (data.errorCode === 0) {
			dispatch(showInfo('Đã thêm món ăn'));
			hashHistory.push('/');
		}
	});
}