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
	componentWillUnmount() {
		this.props.setStatus('');
	}
	render() {
		const { 
			value,
			setRestaurant,
			setUsername,
			setPassword,
			setPhone,
			setAddress,
			doSignup
		} = this.props;
		return (
			<div style={style}>
				<Paper zDepth={3} style={{
					padding: '20px'
				}}>
					<h1 style={{
						textAlign: 'center'
					}}>Đăng ký</h1>
					<form onSubmit={e => {
						e.preventDefault();
						doSignup();
					}}>
						<RadioButtonGroup name="accType" valueSelected={value.restaurant ? "restaurant" : "diner"}
							onChange={(e, v) => {
								setRestaurant(v === "restaurant");
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
					    <TextField
					      	floatingLabelText="Số điện thoại"
					      	fullWidth={true}
					      	value={value.phone}
					      	onChange={(e, v) => {
					      		setPhone(v);
					      	}}
					    />
					    <TextField
					      	floatingLabelText="Địa chỉ"
					      	fullWidth={true}
					      	value={value.address}
					      	onChange={(e, v) => {
					      		setAddress(v);
					      	}}
					    />
					    <span style={{
					    	paddingBottom: '10px',
					    	display: 'block',
					    	color: 'red'
					    }}>{value.status}</span>
				    	<RaisedButton label="Đăng ký ngay" primary={true} 
				    		fullWidth={true} type="submit"/>
			    	</form>
				</Paper>
			</div>
		)
	}
}

export default Signup;