import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import HorDish from '../../sub-components/HorDish';
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
	edit(id) {

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
										marginLeft: 5,
										marginRight: 5
									}}
									label="Sửa" 
									primary={true}
									icon={<i style={{color: '#fff'}} className="material-icons">delete_forever</i>}
									onTouchTap={() => {
										hashHistory.push(`/edit/${dish._id}`);
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

export default connect(state => ({
	user: state.user
}), {})(Dishes);