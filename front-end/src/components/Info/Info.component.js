import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class Info extends Component {
	render() {
		return (
			<Snackbar
				open={this.props.value.show}
				message={this.props.value.content}
				autoHideDuration={5000}
				action="Đóng"
				onRequestClose={(reason) => {
					if (reason !== "clickaway") {
						this.props.closeInfo();
					}
				}}
				onActionTouchTap={() => {
					this.props.closeInfo();
				}}
			/>
		)
	}
}

export default Info;