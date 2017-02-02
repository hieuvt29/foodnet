import React, { Component } from 'react';

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

	addDish() {
		this.props.setName(this.state.name);
		this.props.setPrice(parseInt(this.state.price, 10));
		this.props.setDescription(this.state.description);
		this.props.setImage(this.state.image);
		this.props.addDish();
	}

	render() {
		return (
			<div style={{maxWidth: "550px", margin: "0 auto"}}>
           		<div style={{textAlign: "center"}}><h3>Thêm món ăn</h3></div>
           		<form onSubmit={(e) => {
           			e.preventDefault();
           			this.addDish();
           		}}>
	                <div className="row">
				        <div className="input-field col s12">
				          	<input id="dishName" type="text" className="validate" required 
				          		value={this.state.name}
				          		onChange={e => this.setState({
				          			name: e.target.value
				          		})}/>
				          	<label htmlFor="dishName">Tên món ăn</label>
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
				          	<label htmlFor="dishPrice">Giá</label>
				        </div>
				        <div className="input-field col s12">
				          	<input id="dishDescription" type="text" className="validate" required
				          		value={this.state.description}
				          		onChange={e => this.setState({
				          			description: e.target.value
				          		})}/>
				          	<label htmlFor="dishDescription">Mô tả</label>
				        </div>
				        <div className="input-field col s12">
				          	<input id="dishURL" type="text" className="validate" required
				          		value={this.state.image}
				          		onChange={e => this.setState({
				          			image: e.target.value
				          		})}/>
				          	<label htmlFor="dishURL">URL Hình ảnh</label>
				        </div>
				        <div className="col s12">
				        	<span style={{color: 'red'}}>{this.props.status}</span>
				        </div>
				        <div className="input-field col s12">
				        	<button className={"waves-effect waves-light btn cyan" + (this.props.doing ? " disabled" : "")} 
				        		type="submit">
				        		{this.props.doing ? "Đang thêm món" : "Thêm"}
				        	</button>
				        </div>
				    </div>
			    </form>
            </div>
		)
	}
}

export default AddDish;