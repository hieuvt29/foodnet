import React, {Component} from 'react';

class Dropdown extends Component {
	render() {
		return (
			<ul id={this.props.dropdownId} className="dropdown-content">
			  	<li><a href="#">one</a></li>
			  	<li><a href="#">two</a></li>
			  	<li className="divider"></li>
			  	<li><a href="#">three</a></li>
			</ul>
		)
	}
}

class Navbar extends Component {
  	render() {
    	return (
    		<div className="navbar-fixed">
	    		<Dropdown dropdownId="dropdown" />
		      	<nav className="blue lighten-1">
		      		<div className="container">
			      		<a href="#!" className="brand-logo">FoodNet</a>
			      		<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
			      		<ul className="right hide-on-med-and-down" style={this.props.info ? {} : {display: 'none'}}>
					      	<li><a href="sass.html">Sass</a></li>
					      	<li><a href="badges.html">Components</a></li>
					      	<li>
					      		<a className="dropdown-button" href="#" data-activates="dropdown">Dropdown
					      			<i className="material-icons right">arrow_drop_down</i>
					      		</a>
					      	</li>
					    </ul>
					    <ul className="side-nav" id="mobile-demo">
					        <li><a href="sass.html">Sass</a></li>
					        <li><a href="badges.html">Components</a></li>
					        <li><a href="collapsible.html">Javascript</a></li>
					        <li><a href="mobile.html">Mobile</a></li>
				      	</ul>
				    </div>
		      	</nav>
	      	</div>
    	);
  	}
}

export default Navbar;