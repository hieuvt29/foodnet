import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.user.username,
			phone: this.props.user.hotline,
			address: this.props.user.address,
			oldPassword: '',
			newPassword: '',
		}
	}
	render() {
		const {	address, phone, oldPassword, newPassword } = this.state;
		return (
			<div style={{
				margin: '0 auto',
				maxWidth: '600px'
			}}>
				<Paper zDepth={3} style={{
					padding: '20px'
				}}>
					<h2 style={{
						textAlign: 'center',
						fontWeight: '400'
					}}>Thông tin cá nhân</h2>
					<form onSubmit={e => {
						e.preventDefault();
						this.props.updateInfo({
							phone: this.state.phone,
							address: this.state.address
						});
					}}>
						<TextField
					      	floatingLabelText="Tên người dùng"
					      	fullWidth={true}
					      	value={this.props.user.username}
					      	disabled={true}
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
					      		});
					      	}}
					    />
					    <RaisedButton label="Cập nhật" primary={true} 
				    		fullWidth={true} type="submit"/>
					</form>
					<hr style={{
						marginTop: '20px'
					}}/>
					<h4 style={{
						marginBottom: '-10px',
						textAlign: 'left',
						fontWeight: '400',
					}}>Đổi mật khẩu</h4>
					<form onSubmit={e => {
						e.preventDefault();
						this.props.updatePassword(this.state.oldPassword, 
								this.state.newPassword);
					}}>
						<TextField
					      	floatingLabelText="Mật khẩu cũ"
					      	fullWidth={true}
					      	type="password"
					      	value={oldPassword}
					      	onChange={(e, v) => {
					      		this.setState({
					      			oldPassword: v
					      		});
					      	}}
					    />
					    <TextField
					      	floatingLabelText="Mật khẩu mới"
					      	fullWidth={true}
					      	type="password"
					      	value={newPassword}
					      	onChange={(e, v) => {
					      		this.setState({
					      			newPassword: v
					      		});
					      	}}
					    />
					    <RaisedButton label="Đổi mật khẩu" primary={true} 
				    		fullWidth={true} type="submit"/>
					</form>
				</Paper>
			</div>
		)
	}
}

import { connect } from 'react-redux';
import { updateInfo, updatePassword } from '../../actions/user';

export default connect(state => ({
	user: state.user
}), {
	updateInfo, updatePassword
})(UserInfo);