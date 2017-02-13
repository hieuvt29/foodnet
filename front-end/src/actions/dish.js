import $ from 'jquery';

export const setDoing = (doing) => ({
	type: 'SET_DISH_DOING',
	doing
});

export const setStatus = (status) => ({
	type: 'SET_DISH_STATUS',
	status
});

export const addDish = (name, price, info, img) => (dispatch, getState) => {
	const newDish = {
		name, price, info, img
	};
	dispatch(setDoing(true));
	$.post('/agent/dish', newDish, (data) => {
		console.log('Result', data);
		if (data.errorCode === 0) {
			dispatch(setStatus('Thêm thành công!'));
			dispatch(setDoing(false));
		} else {
			dispatch(setStatus('Thêm thất bại!'));
			dispatch(setDoing(false));
		}
	});
};

export const editDish = (id, name, price, info, img) => (dispatch, getState) => {
	dispatch(setDoing(true));
	const newDish = {
		id, name, price, info, img
	};
	$.ajax({
		url: '/agent/dish',
		data: newDish,
		type: 'PUT',
		success: (data) => {
			console.log('Result:', data);
			if (data.errorCode === 0) {
				dispatch(setStatus('Sửa thành công!'));
				dispatch(setDoing(false));
			} else {
				dispatch(setStatus('Sửa thất bại!'));
				dispatch(setDoing(false));
			}
		}
	});
}

export const setDishList = (dishes) => ({
	type: 'SET_DISH_LIST',
	dishes
});

export const loadDish = (dispatch, getState) => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (user.isAgent) {
		$.get('/user/dishes', (data) => {
            if (data.errorCode === 0) {
                dispatch(setDishList(data.data));
            } else {
                console.log('Failed to get dishes');
            }
        });
	} else {
		$.get('/latest-dishes', (data) => {
            if (data.errorCode === 0) {
                const id = user._id;
                data.data.forEach((e) => {
                    if (e.likes.users.indexOf(id) !== -1) {
                        e.liked = true;
                    }
                    if (e.dislikes.users.indexOf(id) !== -1) {
                        e.disliked = true;
                    }
                });
                dispatch(setDishList(data.data));
            } else {
                console.log('Failed to get dishes');
            }
        });
	}
}

export const commentDish = (id, comment) => (dispatch, getState) => {
	const user = JSON.parse(localStorage.getItem('user'));
	const dishes = getState().dish.dishes;
	for (let i = 0; i < dishes.length; i++) {
        if (dishes[i]._id === id) {
            let nDish = Object.assign([], dishes);
            nDish[i].reviews.push({
                comment: comment,
                user: user 
            });
            dispatch(setDishList(nDish));
            break;
        }
    }
	$.post('/agent/dish/comment', {
        id: id,
        comment: comment
    }, (data) => {
        console.log(data);
    });
}

export const likeDish = (id) => (dispatch, getState) => {
	const user = JSON.parse(localStorage.getItem('user')); 
	const dishes = getState().dish.dishes;
	for (let i = 0; i < dishes.length; i++) {
        if (dishes[i]._id === id) {
            let nDish = Object.assign([], dishes);
            if (nDish[i].liked === true) {
            	nDish[i].liked = false;
            	nDish[i].likes.count -= 1;
            	nDish[i].likes.users.splice(nDish[i].likes.users.indexOf(user._id), 1);
            } else {
            	nDish[i].liked = true;
            	nDish[i].likes.count += 1;
            	nDish[i].likes.users.push(user._id);
            }
            dispatch(setDishList(nDish));
            break;
        }
    }
    $.post('/agent/dish/like', {
        id
    }, (data) => {
        console.log(data);
    });
}

export const dislikeDish = (id) => (dispatch, getState) => {
	const dishes = getState().dish.dishes;
	const user = JSON.parse(localStorage.getItem('user')); 
	for (let i = 0; i < dishes.length; i++) {
        if (dishes[i]._id === id) {
            let nDish = Object.assign([], dishes);
            if (nDish[i].disliked === true) {
            	nDish[i].disliked = false;
            	nDish[i].dislikes.count -= 1;
            	nDish[i].dislikes.users.splice(nDish[i].dislikes.users.indexOf(user._id), 1);
            } else {
            	nDish[i].disliked = true;
            	nDish[i].dislikes.count += 1;
            	nDish[i].dislikes.users.push(user._id);
            }
            dispatch(setDishList(nDish));
            break;
        }
    }
    $.post('/agent/dish/dislike', {
        id
    }, (data) => {
        console.log(data);
    });
}