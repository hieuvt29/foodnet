import React, { Component } from 'react';
import Loading from '../Loading';
import $ from 'jquery';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ChipInput from 'material-ui-chip-input';
import { showInfo } from '../Info/Info.action';
import { connect } from 'react-redux';

const style = {
	margin: '40px auto',
	maxWidth: '600px'
};

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			price: '',
			image: '',
			description: '',
			ingredients: [],
			tags: [],
			loading: true,
			postLoading: false
		}
		this.update = this.update.bind(this);
	}
	componentDidMount() {
		const id = this.props.params.id;
		$.get(`/agent/dishes/${id}`, data => {
			this.setState({
				loading: false,
				name: data.data.name,
				price: data.data.price,
				tags: data.data.tags,
				image: data.data.img,
				ingredients: data.data.ingredients,
				description: data.data.info
			});
		});
	}
	update() {
		const id = this.props.params.id;
		const state = this.state;	
		const data = {
			name: state.name,
			price: state.price,
			tags: state.tags,
			img: state.image,
			ingredients: state.ingredients,
			info: state.description
		}
		this.setState({
			postLoading: true
		});
		$.ajax({
			url: `/agent/dishes/${id}`,
			type: 'PUT',
			data: JSON.stringify(data),
			contentType : 'application/json',
			success: (data) => {
				this.setState({
					postLoading: false
				});
				this.props.showInfo('Cập nhật thành công')
			}
		});
	}
	render() {
		const { loading, name, price, image, 
				description, ingredients, tags} = this.state;
		return (
			<div>
				{
					this.state.postLoading && <Loading />
				}
				{loading ? <Loading /> : 
					<div style={style}>
						<Paper zDepth={3} style={{
							padding: '20px'
						}}>
							<h3 style={{
								textAlign: 'center',
								fontWeight: '500'
							}}>Sửa thông tin món ăn</h3>
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
						    <RaisedButton label="Cập nhật" primary={true} 
					    		fullWidth={true} 
					    		onTouchTap={e => {
					    			this.update();
					    		}}
					    	/>
						</Paper>
					</div>
				}
			</div>
		)
	}
}

export default connect(state => ({

}), {
	showInfo
}) (Edit);