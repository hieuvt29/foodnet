import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
	margin: '40px auto',
	maxWidth: '500px'
};

class Login extends Component {
	render() {
		const {
			value,
			doLogin,
			setUsername,
			setPassword
		} = this.props;
		return (
			<div style={style}>
				<Paper zDepth={3} style={{
					padding: '20px'
				}}>
					<h1 style={{
						textAlign: 'center'
					}}>Đăng nhập</h1>
					<form onSubmit={e => {
						e.preventDefault();
						doLogin();
					}}>
						<TextField
					      	floatingLabelText="Tên người dùng"
					      	fullWidth={true}
					      	value={value.username}
					      	onChange={(e, v) => {
					      		setUsername(v);
					      	}}
					    />
						<TextField
					      	floatingLabelText="Mật khẩu"
					      	fullWidth={true}
					      	type="password"
					      	value={value.password}
					      	onChange={(e, v) => {
					      		setPassword(v);
					      	}}
					    />
					    <span style={{
					    	paddingBottom: '10px',
					    	display: 'block',
					    	color: 'red'
					    }}>{value.status}</span>
				    	<RaisedButton label="Đăng nhập" primary={true} 
				    		fullWidth={true} type="submit"/>
			    	</form>
				</Paper>
			</div>
		)
	}
}

export default Login;