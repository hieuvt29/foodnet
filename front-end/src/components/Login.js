import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit() {
		this.props.setUsername(this.state.username);
		this.props.setPassword(this.state.password);
		this.props.doLogin();
	}

    render() {
        return (
            <div style={{width: "450px", margin: "0 auto"}}>
           		<div style={{textAlign: "center"}}><h3>Đăng nhập</h3></div>
           		<form onSubmit={(e) => {
           			e.preventDefault();
           			this.onSubmit();
           		}}>
	                <div className="row">
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
				        <div className="col s12">
				        	<span style={{color: 'red'}}>{this.props.status}</span>
				        </div>
				        <div className="input-field col s12">
				        	<button className={"waves-effect waves-light btn cyan" + (this.props.doing ? " disabled" : "")} 
				        		type="submit">
				        		<i className="right material-icons">forward</i>
				        		{this.props.doing ? "Đang đăng nhập" : "Đăng nhập"}
				        	</button>
				        </div>
				    </div>
			    </form>
            </div>
        );
    }
}

export default Login;
