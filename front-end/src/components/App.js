import React, { Component } from 'react';
import Navbar from '../containers/Navbar';
import Loading from '../containers/Loading';

class App extends Component {
	render() {
		return (
			<div>
				<Navbar />
            	<Loading />
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default App;