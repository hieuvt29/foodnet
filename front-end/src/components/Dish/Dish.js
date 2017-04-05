import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

import './style.css'

const style = {
	user: {
		color: '#2196F3',
		fontWeight: '500'
	},
	date: {
		color: '#757575',
		fontSize: '11px',
		paddingLeft: '5px'
	},
	liked: {
		color: '#03A9F4'
	},
	disliked: {
		color: '#FF5722'
	},
	favorite: {
		color: '#F44336'
	}
}

function Comment(props) {
	return (
		<div>
			<span style={style.user}>{props.username}</span>
			<span style={style.date}>({props.date})</span>: {props.comment}
		</div>
	)
}

class Dish extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openComment: false,
			comment: ''
		};
	}

	render() {
		const {
			text, imgUrl, avatarUrl, ingredients,
			username, date,name, price, tags
		} = this.props;
		const commentList = [ ...this.props.commentList].reverse();
		return (
			<div className="pin">
				<Card>
				    <CardHeader
				      	title={username}
				      	subtitle={date}
				      	avatar={avatarUrl}
				    />
				    <CardMedia>
				      	<img src={imgUrl} alt={name}/>
				    </CardMedia>
				    <CardTitle title={name} subtitle={price + " VNĐ"} />
				    <CardText>
				    	{text}
				    </CardText>
				    {
			    	(ingredients && ingredients.length !== 0) &&
			    	 <CardText style={{
			    	 	paddingTop: '5px',
			    	 	paddingBottom: '5px'
			    	 }}>
				    	<span style={{
				    		fontWeight: 500
				    	}}>Thành phần</span>: {ingredients.join(', ')}
				    </CardText>
				    }
				    {
			    	(tags && tags.length !== 0) &&
			    	<CardText style={{
			    		display: 'flex',
    					flexWrap: 'wrap',
    					paddingTop: '5px',
			    	 	paddingBottom: '5px'
			    	}}>
				    	{tags.map(tag => (
				    		<Chip key={tag} style={{margin: 2}}>
				    			{tag}
				    		</Chip>
				    	))}	
				    </CardText>
				    }
				    <CardActions style={{
				    	borderTop: '1px solid #eee'
				    }}>
				      	<FlatButton label={this.props.likeCount} labelPosition="after" 
				      		icon={<i style={style.iconStyle} className="material-icons">thumb_up</i>}
				      		style={this.props.liked ? style.liked : {}}
				      		onTouchTap={e => {
				      			this.props.like();
				      		}}
				      	/>
				      	<FlatButton label={this.props.dislikeCount} labelPosition="after" 
				      		icon={<i style={style.iconStyle} className="material-icons">thumb_down</i>}
				      		style={this.props.disliked ? style.disliked : {}}
				      		onTouchTap={e => {
				      			this.props.dislike();
				      		}}
				      	/>
				      	<FlatButton label={this.props.commentList.length} labelPosition="after" 
				      		icon={<i style={style.iconStyle} className="material-icons">comment</i>}
				      		onTouchTap={e => {
				      			this.setState((preState) => ({
				      				openComment: !preState.openComment
				      			}));
				      		}}
				      	/>
				      	{ this.props.showFavorite && 
				      		<FlatButton icon={<i style={style.iconStyle} className="material-icons">favorite</i>}
					      		style={this.props.isFavorite ? style.favorite : {}}
					      		onTouchTap={e => {
					      			this.props.favorite();
					      		}}
					      	/>
				      	}
				    </CardActions>
				    { this.state.openComment &&
				    <CardText>
				    	<form onSubmit={e => {
				    		e.preventDefault();
				    		if (this.state.comment !== '') {
					    		this.props.comment(this.state.comment);
					    		this.setState({
					    			comment: ''
					    		});
				    		}
				    	}}>
							<TextField
								hintText="Để lại một bình luận"
								fullWidth={true}
								value={this.state.comment}
								onChange={e => {
									this.setState({
										comment: e.target.value
									});
								}}
								autoFocus
							/>
						</form>
						{ commentList.map(review => <Comment 
							key={review._id}
							username={review.user.username}
							date="01-01-2017"
							comment={review.comment}
						/>)}
					</CardText>}
				</Card>
			</div>
		)
	}
}

export default Dish;