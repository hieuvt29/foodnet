import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
// import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import { hashHistory, Link } from 'react-router';
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

const style = {
	MenuItemInner: {
		paddingLeft: '50px'
	},
	iconStyle: {
		color: 'rgb(117, 117, 117)'
	}
}

function Menu(props) {
	const user = props.user;
	return (
		<IconMenu
	      	iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
	      	anchorOrigin={{horizontal: 'left', vertical: 'top'}}
	      	targetOrigin={{horizontal: 'left', vertical: 'top'}}
	      	iconStyle={{
	      		color: 'white'
	      	}}
	    >
	    	{user.isAgent ? 
	    		<MenuItem primaryText="Các món ăn" 
	    			leftIcon={<i style={{
	    				color: '#F44336'
	    			}} className="material-icons">restaurant</i>}
	    			innerDivStyle={style.MenuItemInner}
	    			onTouchTap={() => {
	    				hashHistory.push('/dishes');
	    			}}
	    		/> : 
	    		<MenuItem primaryText="Các món ăn yêu thích" 
	    			leftIcon={<i style={{
	    				color: '#F44336'
	    			}} className="material-icons">favorite</i>}
	    			innerDivStyle={style.MenuItemInner}
	    			onTouchTap={() => {
	    				hashHistory.push('/favorite');
	    			}}
	    		/>
	    	}
	    	<Divider />
	      	<MenuItem primaryText="Thông tin của tôi" 
	      		leftIcon={<i style={{
					color: '#2196F3'
				}} className="material-icons">info_outline</i>}
				innerDivStyle={style.MenuItemInner}
				onTouchTap={() => {
					hashHistory.push('/info');
				}}
			/>
	      	<MenuItem primaryText="Đăng xuất"
				leftIcon={<i style={{
					color: '#9E9E9E'
				}} className="material-icons">exit_to_app</i>}
				innerDivStyle={style.MenuItemInner}
				onTouchTap={() => {
					props.logout();
				}}
			/>
	    </IconMenu>
	)
} 

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
		const {user, logout} = this.props;
		return (
			<div>
				<Toolbar
					style={{
						backgroundColor: '#00BCD4',
						position: 'fixed',
						top: '0',
						width: '100%',
						zIndex: '5',
						boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
					}}
				>
			        <ToolbarGroup>
			          	<Link style={{
			          		textDecoration: 'none'
			          	}} to="/">
			          		<ToolbarTitle text="Foodnet" style={{
				          		color: 'white',
				          		fontWeight: '500',
				          		fontSize: '40px',
				          		paddingLeft: '30px',
				          		paddingRight: '0px',
				          		fontFamily: "'Lobster', cursive"
			          		}} />
			          	</Link>
			          	<ToolbarSeparator style={{
			          		backgroundColor: 'white',
			          		width: '2px'
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
			          	<Menu
			          		user={user}
			          		logout={logout}
			          	/>
			        </ToolbarGroup>
			    </Toolbar>
			</div>
		)
	}
}

export default Navbar;