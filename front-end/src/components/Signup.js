import React, { Component } from 'react';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginType: 0,
			username: '',
			password: '',
			address: '',
			hotline: ''
		}
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit() {

	}

	render() {
		return (
			<div style={{width: "450px", margin: "0 auto"}}>
           		<div style={{textAlign: "center"}}><h3>Đăng ký</h3></div>
           		<form onSubmit={(e) => {
           			e.preventDefault();
           			this.onSubmit();
           		}}>
	                <div className="row">
	                	<div className="col s6">
			            	<input className="with-gap" name="group1" type="radio" id="test3" 
			            		value={0} checked={this.state.loginType === 0}
			            		onChange={(e) => this.setState({
			            			loginType: 0
			            		})}/>
			      			<label htmlFor="test3">Tài khoản thực khách</label>
		      			</div>
		      			<div className="col s6">
			      			<input className="with-gap" name="group1" type="radio" id="test4" 
			      				value={1} checked={this.state.loginType === 1}
			      				onChange={(e) => this.setState({
			            			loginType: 1
			            		})}/>
			      			<label htmlFor="test4">Tài khoản nhà hàng</label>
		      			</div>
				        <div className="input-field col s12">
				          	<input id="username" type="text" className="validate" required
				          		value={this.state.username} 
				          		onChange={(e) => this.setState({
				          			username: e.target.value
				          		})}/>
				          	<label htmlFor="username">Tên người dùng</label>
				        </div>
				        <div className="input-field col s12">
				          	<input id="password" type="password" className="validate" required
				          		value={this.state.password}
				          		onChange={(e) => this.setState({
				          			password: e.target.value
				          		})}/>
				          	<label htmlFor="password">Mật khẩu</label>
				        </div>
				        <div className="input-field col s12">
				          	<input id="address" type="text" className="validate"
				          		value={this.state.address}
				          		onChange={(e) => this.setState({
				          			address: e.target.value
				          		})}/>
				          	<label htmlFor="address">Địa chỉ</label>
				        </div>
				        <div className="input-field col s12">
				          	<input id="hotline" type="text" className="validate"
				          		value={this.state.hotline}
				          		onChange={(e) => this.setState({
				          			hotline: e.target.value
				          		})}/>
				          	<label htmlFor="hotline">Số điện thoại</label>
				        </div>
				        <div className="input-field col s12">
				        	<button className={"waves-effect waves-light btn cyan" + (this.props.logining ? " disabled" : "")} 
				        		type="submit">
				        		Đăng ký
				        		<i className="right material-icons">forward</i>
				        	</button>
				        </div>
				    </div>
			    </form>
            </div>
        )
	}
}

export default Signup;