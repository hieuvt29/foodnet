import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
	margin: '40px auto',
	maxWidth: '500px'
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
	}
	render() {
		const { doLogin } = this.props;
		const { username, password } = this.state;
		return (
			<div style={style}>
				<Paper zDepth={3} style={{
					padding: '20px'
				}}>
					<h3 style={{
						textAlign: 'center',
						fontWeight: '500'
					}}>Đăng nhập</h3>
					<form onSubmit={e => {
						e.preventDefault();
						doLogin(this.state.username, this.state.password);
					}}>
						<TextField
					      	floatingLabelText="Tên người dùng"
					      	fullWidth={true}
					      	value={username}
					      	onChange={(e, v) => {
					      		this.setState({
					      			username: v
					      		});
					      	}}
					    />
						<TextField
					      	floatingLabelText="Mật khẩu"
					      	fullWidth={true}
					      	type="password"
					      	value={password}
					      	onChange={(e, v) => {
					      		this.setState({
					      			password: v
					      		});
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