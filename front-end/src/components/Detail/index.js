import React, { Component } from 'react';
import $ from 'jquery';
import Loading from '../Loading';
import Dish from '../Dish';
import { connect } from 'react-redux';
import deepCopy from '../../utils/deep-copy';

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			data: null
		}
	}
	componentDidMount() {
		this.props.setTitle('Chi tiết');
		const id = this.props.params.id;
		const userId = this.props.user._id;
		const favoriteIds = this.props.user.interests.map(i => i._id);
		$.get(`/agent/dishes/${id}`, data => {
			const dish = data.data;
			const likes = dish.likes.users.map(u => u._id);
			const dislikes = dish.dislikes.users.map(u => u._id);
			if (likes.indexOf(userId) !== -1) {
				dish.liked = true;
			}
			if (dislikes.indexOf(userId) !== -1) {
				dish.disliked = true;
			}
			if (favoriteIds.indexOf(dish._id) !== -1) {
				dish.favorite = true;
			}
			this.setState({
				loading: false,
				data: dish
			});
		});
	}

	comment(id, comment) {
		const dish = deepCopy(this.state.data);
		$.post('/agent/dish/comment', {
			id, comment
		}, data => {
			if (data.errorCode === 0) {
				dish.reviews.push({
					user: {
						username: data.data.user,
					},
					comment: data.data.comment.comment,
					_id: data.data.comment._id
				});
				this.setState({
					data: dish
				});
			} else {
				console.error(data);
			}
		});
	}
	like(id) {
		const dish = deepCopy(this.state.data);
		$.post('/agent/dish/like', {
			id
		}, data => {
			if (data.errorCode === 0) {
				if (dish.liked) {
					dish.likes.count--;
					dish.liked = false;
				} else {
					dish.likes.count++;
					dish.liked = true;
				}
				this.setState({
					data: dish
				});
			} else {
				console.error(data);
			}
		});
	}
	dislike(id) {
		const dish = deepCopy(this.state.data);
		$.post('/agent/dish/dislike', {
			id
		}, data => {
			if (data.errorCode === 0) {
				if (dish.disliked) {
					dish.dislikes.count--;
					dish.disliked = false;
				} else {
					dish.dislikes.count++;
					dish.disliked = true;
				}
				this.setState({
					data: dish
				});
			} else {
				console.error(data);
			}
		});
	}
	favorite(id) {
		const dish = deepCopy(this.state.data);
		const user = deepCopy(this.props.user);
		if (dish.favorite) {
			dish.favorite = false;
			user.interests.splice(user.interests.map(d => d._id).indexOf(dish._id), 1);
		} else {
			dish.favorite = true;
			user.interests.push(dish);
		}
		this.props.setUser(user);
		this.setState({
			data: dish
		});
		$.post('/agent/dish/interest', {
			id: id
		}, data => {
			if (data.errorCode === 0) {
				if (data.message === "interested") {
					this.props.showInfo('Đã thêm vào danh sách yêu thích');
				} else {
					this.props.showInfo('Đã loại bỏ khỏi danh sách yêu thích');
				}
			}
		});
	}

	render() {
		const dish = this.state.data;
		return (
			<div>
				{this.state.loading && <Loading />}
				<div style={{
					maxWidth: 600,
					margin: '0 auto',
					marginBottom: 50
				}}>
					{this.state.data && <Dish 
						key={dish._id}
						avatarUrl="https://johnochwat.files.wordpress.com/2010/07/mini-avatar.gif"
						text={dish.info}
						imgUrl={dish.img}
						username={dish.creator.username}
						date={dish.created_at.split('T')[0]}
						name={dish.name}
						price={dish.price}
						comment={cmt => {
							this.comment(dish._id, cmt);
						}}
						like={() => {
							this.like(dish._id);
						}}
						dislike={() => {
							this.dislike(dish._id);
						}}
						liked={dish.liked}
						disliked={dish.disliked}
						likeCount={dish.likes.count}
						dislikeCount={dish.dislikes.count}
						commentList={dish.reviews}
						ingredients={dish.ingredients}
						tags={dish.tags}
						favorite={() => {
							this.favorite(dish._id);
						}}
						isFavorite={dish.favorite}
						showFavorite={this.props.user.isAgent ? false : true}
					/>}
				</div>
			</div>
		)
	}
}

import { setUser }  from '../../actions/user';
import { showInfo } from '../../actions/info';
import { setTitle } from '../../actions/title';

export default connect(state => ({
	user: state.user
}), {
	setUser, showInfo, setTitle
})(Detail);