import React, { Component } from 'react';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginType: 0,
			username: '',
			password: '',
			reppassword: '',
			address: '',
			hotline: ''
		}
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit() {
		this.props.setUsername(this.state.username);
		this.props.setPassword(this.state.password);
		this.props.setLoginType(this.state.loginType);
		this.props.setAddress(this.state.address);
		this.props.setHotline(this.state.hotline);
		this.props.doSignup();
	}

	render() {
		return (
			<div style={{maxWidth: "450px", margin: "0 auto"}}>
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
				          	<input id="reppassword" type="password" 
				          		className={(this.state.reppassword === this.state.password ? "valid" : " invalid")} 
				          		required
				          		value={this.state.reppassword}
				          		onChange={(e) => {
				          			this.setState({
				          				reppassword: e.target.value
				          			})
				          		}}/>
				          	<label style={{width: '100%'}} htmlFor="reppassword" data-error="Mật khẩu nhập lại không đúng">Nhập lại mật khẩu</label>
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
				          		onChange={(e) => isNaN(e.target.value) ? null : this.setState({
				          			hotline: e.target.value
				          		})}/>
				          	<label htmlFor="hotline">Số điện thoại</label>
				        </div>
				        <div className="col s12">
				        	<span style={{color: 'red'}}>{this.props.status}</span>
				        </div>
				        <div className="input-field col s12">
				        	<button className={"waves-effect waves-light btn cyan" + (this.props.doing ? " disabled" : "")} 
				        		type="submit">
				        		{this.props.doing ? "Đang đăng ký" : "Đăng ký"}
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