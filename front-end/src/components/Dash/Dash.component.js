import React, { Component } from 'react';
import Dish from '../../sub-components/Dish';
import { hashHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import './style.css';

const style = {
	position: 'fixed',
	right: '40px',
	bottom: '40px'
}

function AddButton(props) {
	return (
		<FloatingActionButton style={style}
			backgroundColor="#00C853"
			onTouchTap={props.onTouchTap}
		>
			<ContentAdd />
		</FloatingActionButton>
	)
}

class Dash extends Component {
	constructor(props) {
		super(props);
		this.handleScroll = this.handleScroll.bind(this);
		this.lastScroll = 0;
	}

	componentWillMount() {
		this.props.loadDishes();
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
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
	favorite(dish) {
		this.props.favorite(dish);
	}

	handleScroll() {
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
		const windowBottom = windowHeight + window.pageYOffset;
		const valueCompare = (docHeight > 100 ? (docHeight - 100) : docHeight);
		if (windowBottom > this.lastScroll) {
			if (windowBottom >= valueCompare) {
				// console.log('Bottom reached');
				this.props.loadMore(() => {
					// Callback on nothing change
					//window.scrollTo(window.scrollX, window.scrollY - 100);
				});
			}
		}
		this.lastScroll = windowBottom;
	}

	render() {
		const { dishes, loading } = this.props.value;
		return (
			<div>
				<div className="columns">
				{dishes.map(dish =>
					<Dish 
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
					/>
				)}
				</div>
				{this.props.user.isAgent &&
					<AddButton 
						style={{
							zIndex: "10"
						}}
	    				onTouchTap={() => {
	    					hashHistory.push('/add');
	    				}}
		    		/>
	    		}
	    		{ loading &&
					<div style={{
						textAlign: 'center'
					}}>
						<CircularProgress size={80} thickness={5} />
					</div>
				}
			</div>
		)
	}
}
export default Dash;