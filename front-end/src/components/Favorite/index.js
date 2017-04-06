import React, { Component } from 'react';
import HorDish from '../HorDish';
import RaisedButton from 'material-ui/RaisedButton';

class Favorite extends Component {
	constructor(props) {
		super(props);
		this.details = this.details.bind(this);
	}
	componentDidMount() {
		this.props.setTitle('Yêu thích');
	}
	remove(id) {
		console.log('Remove id %s', id);
		this.props.removeFavorite(id);
	}
	details(id) {
		this.props.push(`/detail/${id}`);
	}
	render() {
		const dishes = this.props.favorite;
		return (
			<div style={{
				maxWidth: '1200px',
				margin: '0 auto 20px auto',
				paddingLeft: '10px',
				paddingRight: '10px',
			}}>
			{
				dishes.map(dish => (
					<HorDish
						key={dish._id}
						image={dish.img}
						title={dish.name}
						content={dish.info}
						actions={
							<div>
								<RaisedButton
									style={{
										marginRight: 5
									}} 
									label="Xem chi tiết" 
									primary={true}
									icon={<i style={{color: '#fff'}} className="material-icons">remove_red_eye</i>}
									onTouchTap={() => {
										this.details(dish._id);
									}}
								/>
								<RaisedButton 
									label="Loại bỏ" 
									secondary={true}
									icon={<i style={{color: '#fff'}} className="material-icons">delete_forever</i>}
									onTouchTap={() => {
										this.remove(dish._id);
									}}
								/>
							</div>
						}
					/>
				))
			}
			</div>
		)
	}
}

import { connect } from 'react-redux';
import { removeFavorite } from '../../actions/dishes';
import { setTitle } from '../../actions/title';
import { push } from 'react-router-redux';

export default connect(state => ({
	favorite: state.user.interests
}), {
	removeFavorite, push, setTitle
})(Favorite);