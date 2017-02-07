import React, { Component } from 'react';
import $ from 'jquery';
import { hashHistory, Link } from 'react-router';

class DishForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			price: '',
			description: '',
			image: ''
		}
		this.process = this.process.bind(this);
		if (this.props.dishId) {
			$.get('/dishes/' + this.props.dishId, (data) => {
				if (data.errorCode !== 0) {
				 	return hashHistory.push('/');
				} 
				this.setState({
					name: data.data.name,
					price: data.data.price,
					description: data.data.info,
					image: data.data.img
				});
			});
		}
	}

	process() {
		this.props.action({...this.state});	
	}

	render() {
		return (
			<div style={{maxWidth: "550px", margin: "0 auto"}}>
           		<div style={{textAlign: "center"}}><h3>{this.props.title}</h3></div>
           		<form onSubmit={(e) => {
           			e.preventDefault();
           			this.process();
           		}}>
	                <div className="row">
				        <div className="input-field col s12">
				          	<input id="dishName" type="text" className="validate" required 
				          		value={this.state.name}
				          		onChange={e => this.setState({
				          			name: e.target.value
				          		})}/>
				          	<label className={this.props.edit ? "active" : ""} htmlFor="dishName">Tên món ăn</label>
				        </div>
				        <div className="input-field col s12">
				          	<input id="dishPrice" type="text" className="validate" required
				          		value={this.state.price}
				          		onChange={e => {
				          			if (!isNaN(e.target.value)) 
					          			this.setState({
					          				price: e.target.value
					          			}
				          		)}}/>
				          	<label className={this.props.edit ? "active" : ""} htmlFor="dishPrice">Giá</label>
				        </div>
				        <div className="input-field col s12">
				          	<input id="dishDescription" type="text" className="validate" required
				          		value={this.state.description}
				          		onChange={e => this.setState({
				          			description: e.target.value
				          		})}/>
				          	<label className={this.props.edit ? "active" : ""} htmlFor="dishDescription">Mô tả</label>
				        </div>
				        <div className="input-field col s12">
				          	<input id="dishURL" type="text" className="validate" required
				          		value={this.state.image}
				          		onChange={e => this.setState({
				          			image: e.target.value
				          		})}/>
				          	<label className={this.props.edit ? "active" : ""} htmlFor="dishURL">URL Hình ảnh</label>
				        </div>
				        <div className="col s12">
				        	<span style={{color: 'red'}}>{this.props.status}</span>
				        </div>
				        <div className="input-field col s12">
				        	<button className={"waves-effect waves-light btn cyan" + (this.props.doing ? " disabled" : "")} 
				        		type="submit">
				        		{this.props.doing ? "Đang thực hiện" : "Xong"}
				        	</button>
				        	<Link to="/" className="waves-effect waves-teal btn purple lighten-2"
				        		style={{ marginLeft: '5px'}}>Trang chủ</Link>
				        </div>
				    </div>
			    </form>
            </div>
		);
	}
}

export default DishForm;