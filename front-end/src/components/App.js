import React, { Component } from 'react';
import Navbar from '../containers/Navbar';

class App extends Component {
	render() {
		return (
			<div>
				<Navbar />
    			{this.props.children}
  			</div>
		)
	}
}

export default App;