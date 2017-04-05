import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar';

class App extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div style={{
					marginTop: 80
				}}>
	    			{this.props.children}
				</div>
  			</div>
		)
	}
}

export default connect(state => ({
	user: state.user
}), {

})(App);