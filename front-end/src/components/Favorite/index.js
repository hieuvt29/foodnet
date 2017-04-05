import React, { Component } from 'react';
import HorDish from '../HorDish';
import RaisedButton from 'material-ui/RaisedButton';

class Favorite extends Component {
	remove(id) {
		console.log('Remove id %s', id);
		this.props.removeFavorite(id);
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

export default connect(state => ({
	favorite: state.user.interests
}), {
	removeFavorite
})(Favorite);