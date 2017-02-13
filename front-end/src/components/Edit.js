import React, { Component } from 'react';
import DishForm from './DishForm';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.editDish = this.editDish.bind(this);
		this.props.setStatus('');
	}

	editDish(item) {
		this.props.editDish(this.props.params.id, item.name,
			item.price, item.description, item.image);
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