import React, { Component } from 'react';
import Navbar from './Navbar';
import Login from '../containers/Login';
import Signup from '../containers/Signup';

class App extends Component {
    render() {
        return (
        	<div>
            	<Navbar/>
            	<div className="container">
            		<Signup />
            	</div>
            </div>
        );
    }
}

export default App;
