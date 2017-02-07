import React, { Component } from 'react';
import DishForm from './DishForm';

class AddDish extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			price: '',
			description: '',
			image: ''
		}
		this.addDish = this.addDish.bind(this);
		this.props.setStatus('');
	}

	addDish(item) {
		this.props.setName(item.name);
		this.props.setPrice(parseInt(item.price, 10));
		this.props.setDescription(item.description);
		this.props.setImage(item.image);
		this.props.addDish();
	}

	render() {
		return (
			<DishForm 
				title="Thêm món ăn"
				action={this.addDish}
				status={this.props.status}
				doing={this.props.doing}
			/>
		)
	}
}

export default AddDish;