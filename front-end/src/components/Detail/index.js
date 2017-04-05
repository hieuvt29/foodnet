import React, { Component } from 'react';
import $ from 'jquery';
import Loading from '../Loading';
import Dish from '../Dish';
import { connect } from 'react-redux';

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			data: null
		}
	}
	componentDidMount() {
		const id = this.props.params.id;
		$.get(`/agent/dishes/${id}`, data => {
			const dish = data.data;
			this.setState({
				loading: false,
				data: data.data
			});
		});
	}
	render() {
		const dish = this.state.data;
		return (
			<div>
				{this.state.loading && <Loading />}
				<div style={{
					maxWidth: 600,
					margin: '0 auto'
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
							this.favorite(dish);
						}}
						isFavorite={dish.favorite}
						showFavorite={this.props.user.isAgent ? false : true}
					/>}
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}), {})(Detail);