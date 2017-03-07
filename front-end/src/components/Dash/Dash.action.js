import $ from 'jquery';
import {
	SET_DISHES,
	SET_PAGE
} from '../../actions/actionTypes';
import deepCopy from '../../utils/deep-copy';

export const setDishes = (dishes) => ({
	type: SET_DISHES,
	dishes
});

export const setPage = (page) => ({
	type: SET_PAGE,
	page
});

export const loadDishes = () => (dispatch, getState) => {
	const value = getState().dash;
	const items = 9;
	const page = value.page;
	$.get('/latest-dishes?items=' + items + '&page=' + page, data => {
		console.log(data);
		if (data.errorCode === 0) {
			const dishes = data.data;
			const userId = JSON.parse(localStorage.getItem('user'))._id;
			dishes.forEach(dish => {
				if (dish.likes.users.find(user => {
					return user._id === userId;
				})) {
					dish.liked = true;
				} else {
					dish.liked = false;
				}
				if (dish.dislikes.users.find(user => {
					return user._id === userId;
				})) {
					dish.disliked = true;
				} else {
					dish.disliked = false;
				}
			});
			dispatch(setDishes(dishes));
		} else {
			console.error(data);
		}
	});
}

export const comment = (id, comment) => (dispatch, getState) => {
	const dishes = deepCopy(getState().dash.dishes);
	$.post('/agent/dish/comment', {
		id, comment
	}, data => {
		if (data.errorCode === 0) {
			const dish = dishes.find(item => {
				return item._id === id;
			});
			dish.reviews.push({
				user: {
					username: data.data.user,
				},
				comment: data.data.comment.comment,
				_id: data.data.comment._id
			});
			dispatch(setDishes(dishes));
		} else {
			console.error(data);
		}
	});
}

export const like = (id) => (dispatch, getState) => {
	$.post('/agent/dish/like', {
		id
	}, data => {
		if (data.errorCode === 0) {
			const dishes = deepCopy(getState().dash.dishes);
			const dish = dishes.find(d => d._id === id);
			if (dish.liked) {
				dish.likes.count--;
				dish.liked = false;
			} else {
				dish.likes.count++;
				dish.liked = true;
			}
			dispatch(setDishes(dishes));
		} else {
			console.error(data);
		}
	});
}

export const dislike = (id) => (dispatch, getState) => {
	$.post('/agent/dish/dislike', {
		id
	}, data => {
		if (data.errorCode === 0) {
			const dishes = deepCopy(getState().dash.dishes);
			const dish = dishes.find(d => d._id === id);
			if (dish.disliked) {
				dish.dislikes.count--;
				dish.disliked = false;
			} else {
				dish.dislikes.count++;
				dish.disliked = true;
			}
			dispatch(setDishes(dishes));
		} else {
			console.error(data);
		}
	});
}