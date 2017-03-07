import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
// import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

// class DrawerSimpleExample extends React.Component {

//   	constructor(props) {
//     	super(props);
//     	this.state = {open: false};
//   	}

//   	handleToggle = () => this.setState({open: !this.state.open});

//   	render() {
//     	return (
//       		<div>
// 	        	<Drawer open={this.props.open}>
// 	          		<MenuItem>Menu Item</MenuItem>
// 	          		<MenuItem>Menu Item 2</MenuItem>
// 	        	</Drawer>
//       		</div>
//     	);
//  	}
// }

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			open: false,
			value: 3,
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

  	handleChange = (event, index, value) => this.setState({value});

	render() {
		return (
			<div>
				<Toolbar style={{
					backgroundColor: '#00BCD4'
				}}>
			        <ToolbarGroup>
			          	<ToolbarTitle text="Foodnet" style={{
			          		color: 'white'
			          	}}/>
			          	<ToolbarSeparator style={{
			          		backgroundColor: 'white'
			          	}}/>
			          	<TextField
					    	hintText={<span style={{color: 'white'}}>Tìm kiếm</span>}
					    	inputStyle={{
					    		color: 'white'
					    	}}
					    	style={{
					    		marginLeft: '30px'
					    	}}
					    />
			          	
			        </ToolbarGroup>
			        <ToolbarGroup lastChild={true}>
			          	<IconMenu
					      	iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
					      	anchorOrigin={{horizontal: 'left', vertical: 'top'}}
					      	targetOrigin={{horizontal: 'left', vertical: 'top'}}
					      	iconStyle={{
					      		color: 'white'
					      	}}
					    >
					      	<MenuItem primaryText="Refresh" />
					      	<MenuItem primaryText="Send feedback" />
					      	<MenuItem primaryText="Settings" />
					      	<MenuItem primaryText="Help" />
					      	<MenuItem primaryText="Sign out" />
					    </IconMenu>
			        </ToolbarGroup>
			    </Toolbar>
			</div>
		)
	}
}

export default Navbar;