import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../actions/title';

class Search extends Component {
	componentDidMount() {
		this.props.setTitle('Tìm kiếm');
	}
	render() {
		return (
			<div>
				<h5 style={{
					textAlign: 'center'
				}}>
					<span style={{
						fontWeight: 300
					}}>Kết quả tìm kiếm cho</span> {this.props.params.s}
				</h5>
			</div>
		)
	}
}

export default connect(state => ({

}), {
	setTitle
})(Search);