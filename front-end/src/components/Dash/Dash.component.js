import React, { Component } from 'react';
import Dish from '../../sub-components/Dish';

import './style.css';

class Dash extends Component {
	componentWillMount() {
		this.props.loadDishes();
	}
	comment(id, cmt) {
		this.props.comment(id, cmt);
	}
	like(id) {
		this.props.like(id);
	}
	dislike(id) {
		this.props.dislike(id);
	}
	render() {
		const {
			dishes
		} = this.props.value;
		return (
			<div className="columns">
			{dishes.map(dish =>
				<Dish 
					key={dish._id}
					avatarUrl="https://johnochwat.files.wordpress.com/2010/07/mini-avatar.gif"
					text={dish.info}
					imgUrl={dish.img}
					username={dish.creator}
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
				/>
			)}
			</div>
		)
	}
}
export default Dash;