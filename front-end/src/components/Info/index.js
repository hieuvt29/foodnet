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

import { connect } from 'react-redux';
import { showInfo, closeInfo } from '../../actions/info';

export default connect(state => ({
	value: state.info
}), {
	showInfo, closeInfo
})(Info);