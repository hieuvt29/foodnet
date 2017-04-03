import React, { Component } from 'react';
import { container as Navbar } from '../Navbar';

class App extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div style={{
					marginTop: '70px'
				}}>
	    			{this.props.children}
				</div>
  			</div>
		)
	}
}

export default App;