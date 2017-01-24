import React, { Component } from 'react';
import Navbar from './Navbar';
import Login from '../containers/Login';

class App extends Component {
    render() {
        return (
        	<div>
            	<Navbar/>
            	<div className="container">
            		<Login />
            	</div>
            </div>
        );
    }
}

export default App;
