import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const style = {
	margin: '40px auto',
	maxWidth: '500px'
};

const radioStyle = {
	display: "inline-block",
	width: '50%'
};

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurant: false,
			username: '',
			password: '',
			phone: '',
			address: ''
		}
	}
	render() {
		const { doSignup } = this.props;
		const { restaurant, username, password, phone, address } = this.state;
		return (
			<div style={style}>
				<Paper zDepth={3} style={{
					padding: '20px'
				}}>
					<h3 style={{
						textAlign: 'center'
					}}>Đăng ký</h3>
					<form onSubmit={e => {
						e.preventDefault();
						doSignup(this.state);
					}}>
						<RadioButtonGroup name="accType" valueSelected={restaurant ? "restaurant" : "diner"}
							onChange={(e, v) => {
								this.setState({
									restaurant: (v === "restaurant")
								});
							}}
						>
						    <RadioButton
						    	style={radioStyle}
						        value="diner"
						        label="Tài khoản thực khách"
						    />
						    <RadioButton
						    	style={radioStyle}
						        value="restaurant"
						        label="Tài khoản nhà hàng"
						    />
						</RadioButtonGroup>
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
					    <TextField
					      	floatingLabelText="Số điện thoại"
					      	fullWidth={true}
					      	value={phone}
					      	onChange={(e, v) => {
					      		this.setState({
					      			phone: v
					      		});
					      	}}
					    />
					    <TextField
					      	floatingLabelText="Địa chỉ"
					      	fullWidth={true}
					      	value={address}
					      	onChange={(e, v) => {
					      		this.setState({
					      			address: v
					      		})
					      	}}
					    />
				    	<RaisedButton label="Đăng ký ngay" primary={true} 
				    		fullWidth={true} type="submit"/>
			    	</form>
				</Paper>
			</div>
		)
	}
}

export default Signup;