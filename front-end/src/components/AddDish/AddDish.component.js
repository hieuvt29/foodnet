import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ChipInput from 'material-ui-chip-input'

const style = {
	margin: '40px auto',
	maxWidth: '600px'
};

class AddDish extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			price: '',
			image: '',
			description: '',
			ingredients: [],
			tags: []
		};
	}
	render() {
		const { name, price, image, description, ingredients, tags} = this.state;
		return (
			<div style={style}>
				<Paper zDepth={3} style={{
					padding: '20px'
				}}>
					<h3 style={{
						textAlign: 'center',
						fontWeight: '500'
					}}>Thêm món ăn</h3>
					<TextField
				      	floatingLabelText="Tên món ăn"
				      	fullWidth={true}
				      	value={name}
				      	onChange={(e, v) => {
				      		this.setState({
				      			name: v
				      		});
				      	}}
				    />
				    <TextField
				      	floatingLabelText="Giá"
				      	fullWidth={true}
				      	value={price}
				      	onChange={(e, v) => {
				      		if (!isNaN(v)) {
				      			this.setState({
					      			price: v
					      		});	
				      		}
				      	}}
				    />
				    <TextField
				      	floatingLabelText="URL Hình ảnh"
				      	fullWidth={true}
				      	value={image}
				      	onChange={(e, v) => {
				      		this.setState({
				      			image: v
				      		});
				      	}}
				    />
				    <TextField
				      	floatingLabelText="Mô tả"
				      	multiLine={true}
				      	fullWidth={true}
				      	value={description}
				      	onChange={(e, v) => {
				      		this.setState({
				      			description: v
				      		});
				      	}}
				    />
					<ChipInput
						floatingLabelText="Thành phần"
						hintText="Nhấn Enter để thêm một thành phần"
						value={ingredients}
						onRequestAdd={(chip) => {
							const newIngredients = [...ingredients];
							newIngredients.push(chip);
							this.setState({
								ingredients: newIngredients
							});
						}}
						onRequestDelete={(chip, index) => {
							const newIngredients = [...ingredients];
							newIngredients.splice(index, 1);
							this.setState({
								ingredients: newIngredients
							});
						}}
						fullWidth={true}
					/>
				    <ChipInput
						floatingLabelText="Tags"
						hintText="Nhấn Enter để thêm một tag"
						value={tags}
						onRequestAdd={(chip) => {
							const newTags = [...tags];
							newTags.push(chip);
							this.setState({
								tags: newTags
							});
						}}
						onRequestDelete={(chip, index) => {
							const newTags = [...tags];
							newTags.splice(index, 1);
							this.setState({
								tags: newTags
							});
						}}
						fullWidth={true}
					/>
				    <RaisedButton label="Thêm" primary={true} 
			    		fullWidth={true} 
			    		onTouchTap={e => {
			    			this.props.addDish(this.state);
			    		}}
			    	/>
				</Paper>
			</div>
		)
	}
}

export default AddDish;