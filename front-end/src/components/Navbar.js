import React, {Component} from 'react';
import { Link } from 'react-router';

class Dropdown extends Component {
	render() {
		return (
			<ul id={this.props.dropdownId} className="dropdown-content">
			  	<li><Link to="/user">Thông tin</Link></li>
			  	<li className="divider"></li>
			  	<li><a href="#" onClick={(e) => {
			  		e.preventDefault();
			  		this.props.doLogout();
			  	}}>Đăng xuất</a></li>
			</ul>
		)
	}
}

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.user = JSON.parse(localStorage.getItem('user'));
	}
  	render() {
    	return (
    		<div className="navbar-fixed">
	    		<Dropdown dropdownId="dropdown" doLogout={this.props.doLogout}/>
	    		<Dropdown dropdownId="dropdown2" doLogout={this.props.doLogout}/>
		      	<nav className="blue lighten-1">
		      		<div className="container">
			      		<Link to="/" className="brand-logo">FoodNet</Link>
			      		<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
			      		<ul className="right hide-on-med-and-down">
					      	<li><a href="sass.html">Sass</a></li>
					      	<li>
					      		<a className="dropdown-button" href="#" data-activates="dropdown">
					      			Tài khoản<i className="material-icons right">arrow_drop_down</i>
					      		</a>
					      	</li>
					    </ul>
					    <ul className="side-nav" id="mobile-demo">
					        <li><a href="sass.html">Sass</a></li>
					        <li>
					      		<a className="dropdown-button" href="#" data-activates="dropdown2">
					      			Tài khoản<i className="material-icons right">arrow_drop_down</i>
					      		</a>
					      	</li>
				      	</ul>
				    </div>
		      	</nav>
	      	</div>
    	);
  	}
}

export default Navbar;