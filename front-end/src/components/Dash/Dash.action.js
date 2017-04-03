import $ from 'jquery';
import {
	SET_DISHES,
	SET_PAGE,
	SET_LOADING
} from '../../actions/actionTypes';
import { setUser }  from '../../actions/user';
import deepCopy from '../../utils/deep-copy';
import { showInfo } from '../Info/Info.action';

const LOAD_ITEM_COUNT = 9;

export const setDishes = (dishes) => ({
	type: SET_DISHES,
	dishes
});

export const setPage = (page) => ({
	type: SET_PAGE,
	page
});

export const setLoading = loading => ({
	type: SET_LOADING,
	loading
});

export const loadDishes = () => (dispatch, getState) => {
	const value = getState().dash;
	const loading = value.loading;
	const items = LOAD_ITEM_COUNT;
	const page = 0;
	dispatch(setPage(0));
	const favorites = getState().user.interests;
	if (!loading) {
		dispatch(setLoading(true));
		$.get('/latest-dishes?items=' + items + '&page=' + page, data => {
			dispatch(setLoading(false));
			if (data.errorCode === 0) {
				const dishes = data.data;
				const userId = getState().user._id;
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
					if (favorites.map(d => d._id).indexOf(dish._id) !== -1) {
						dish.favorite = true;
					} else {
						dish.favorite = false;
					}
				});
				dispatch(setDishes(dishes));
			} else {
				console.error(data);
			}
		});
	}
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

export const favorite = _dish => (dispatch, getState) => {
	const dishes = deepCopy(getState().dash.dishes);
	const user = deepCopy(getState().user);
	const dish = dishes.find(d => d._id === _dish._id);
	if (dish.favorite) {
		dish.favorite = false;
		user.interests.splice(user.interests.map(d => d._id).indexOf(dish._id), 1);
	} else {
		dish.favorite = true;
		user.interests.push(dish);
	}
	dispatch(setDishes(dishes));
	dispatch(setUser(user));
	$.post('/agent/dish/interest', {
		id: dish._id
	}, data => {
		console.log(data);
		if (data.errorCode === 0) {
			if (data.message === "interested") {
				dispatch(showInfo('Đã thêm vào danh sách yêu thích'));
			} else {
				dispatch(showInfo('Đã loại bỏ khỏi danh sách yêu thích'));
			}
		}
	});
}

export const loadMore = (cb) => (dispatch, getState) => {
	const value = getState().dash;
	const loading = value.loading;
	const oldDishes = value.dishes;
	const favorites = getState().user.interests;
	if (!loading) {
		dispatch(setLoading(true));
		const items = LOAD_ITEM_COUNT;
		const page = value.page;
		$.get('/latest-dishes?items=' + items + '&page=' + (page + 1), data => {
			dispatch(setLoading(false));
			if (data.errorCode === 0) {
				const dishes = data.data;
				if (dishes.length > 0) {
					dispatch(setPage(page + 1));
					const userId = getState().user._id;
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
						if (favorites.map(d => d._id).indexOf(dish._id) !== -1) {
							dish.favorite = true;
						} else {
							dish.favorite = false;
						}
					});
					dispatch(setDishes(oldDishes.concat(dishes)));
					// Callback on nothing change
				} else {
					if (cb) {
						cb();
					}
				}
			} else {
				console.error(data);
			}
		});
	}
}