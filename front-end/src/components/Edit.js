import React, { Component } from 'react';
import DishForm from './DishForm';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.editDish = this.editDish.bind(this);
		this.props.setStatus('');
	}

	editDish(item) {
		this.props.setName(item.name);
		this.props.setPrice(item.price);
		this.props.setDescription(item.description);
		this.props.setImage(item.image);
		this.props.setDishId(this.props.params.id);
		this.props.editDish();
	}

	render() {
		return (
			<DishForm 
				title="Sửa món ăn"
				action={this.editDish}
				status={this.props.status}
				doing={this.props.doing}
				dishId={this.props.params.id}
				edit={true}
			/>
		)
	}
}

export default Edit;