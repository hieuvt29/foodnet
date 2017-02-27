import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
	textAlign: 'center',
	margin: '40px auto',
	maxWidth: '500px'
};

class Login extends Component {
	render() {
		const value = this.props.value;
		return (
			<div style={style}>
				<Paper zDepth={3} style={{
					padding: '20px'
				}}>
					<h1>Đăng nhập</h1>
					<form onSubmit={e => {
						e.preventDefault();
						this.props.doLogin();
					}}>
						<TextField
					      	floatingLabelText="Tên người dùng"
					      	fullWidth={true}
					      	value={value.username}
					      	onChange={(e, v) => {
					      		this.props.setUsername(v);
					      	}}
					    />
						<TextField
					      	floatingLabelText="Mật khẩu"
					      	fullWidth={true}
					      	type="password"
					      	value={value.password}
					      	onChange={(e, v) => {
					      		this.props.setPassword(v);
					      	}}
					    />
				    	<RaisedButton label="Đăng nhập" primary={true} 
				    		fullWidth={true} type="submit"/>
			    	</form>
				</Paper>
			</div>
		)
	}
}

export default Login;