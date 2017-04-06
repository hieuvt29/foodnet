import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import HorDish from '../HorDish';
import RaisedButton from 'material-ui/RaisedButton';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import AddButton from '../AddButton';
import Loading from '../Loading';

class Dishes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dishes: [],
			loading: true
		};
	}
	
	componentDidMount() {
		$.get('/agent/dishes?agentId=' + this.props.user._id, data => {
			this.setState({
				dishes: data.data,
				loading: false
			});
		});
	}

	remove(id) {
		const dishes = _.cloneDeep(this.state.dishes);
		dishes.splice(dishes.map(d => d._id).indexOf(id), 1);
		this.setState({
			dishes
		});
		$.ajax({
			url: `/agent/dishes/${id}`,
			type: 'DELETE',
			success: function(result) {
				console.log(result);
			}
		});
	}

	render() {
		const { dishes, loading } = this.state;
		return (
			<div style={{
				maxWidth: '1200px',
				margin: '0 auto 20px auto',
				paddingLeft: '10px',
				paddingRight: '10px',
			}}>
			{ loading &&
				<Loading />
			}
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
										this.props.push(`/detail/${dish._id}`);
									}}
								/>
								<RaisedButton
									style={{
										marginLeft: 5,
										marginRight: 5,
									}}
									backgroundColor="#a4c639"
									labelColor="#fff"
									label="Sửa"
									icon={<i style={{color: '#fff'}} className="material-icons">delete_forever</i>}
									onTouchTap={() => {
										this.props.push(`/edit/${dish._id}`);
									}}
								/>
								<RaisedButton 
									style={{
										marginLeft: 5,
										marginRight: 5
									}}
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
			<AddButton 
				style={{
					zIndex: "10"
				}}
				onTouchTap={() => {
					hashHistory.push('/add');
				}}
    		/>
			</div>
		)
	}
}

import { setTitle } from '../../actions/title';
import { push } from 'react-router-redux';

export default connect(state => ({
	user: state.user
}), {
	setTitle, push
})(Dishes);