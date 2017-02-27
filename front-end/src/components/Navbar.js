import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const title = (
	<div>
		<span>Foodnet</span>
		<span style={{
			marginLeft: '20px',
			paddingLeft: '20px',
			borderLeft: '1px solid white'
		}}>
			<TextField
		    	hintText={<span style={{color: 'white'}}>Tìm kiếm</span>}
		    	inputStyle={{
		    		color: 'white'
		    	}}
		    />
	    </span>
	</div>
);


class DrawerSimpleExample extends React.Component {

  	constructor(props) {
    	super(props);
    	this.state = {open: false};
  	}

  	handleToggle = () => this.setState({open: !this.state.open});

  	render() {
    	return (
      		<div>
	        	<Drawer open={this.props.open}>
	          		<MenuItem>Menu Item</MenuItem>
	          		<MenuItem>Menu Item 2</MenuItem>
	        	</Drawer>
      		</div>
    	);
 	}
}

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			open: false
		}
	}

	toggle() {
		if (this.div.style.marginLeft === "250px") {
			this.div.style.marginLeft = "0px";
			this.setState({
				open: false
			})
		} else {
			this.div.style.marginLeft = "250px";
			this.setState({
				open: true
			})
		}
	}

	render() {
		return (
			<div style={{
				transition: "margin-left 0.5s"
			}} ref={div => {this.div = div}}>
				<AppBar
					title={title}
					onLeftIconButtonTouchTap={(e) => {
						this.toggle();
					}}
				/>
				<DrawerSimpleExample open={this.state.open} />
			</div>
		)
	}
}

export default Navbar;