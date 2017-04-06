import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';
import './style.css';

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
		this.state = {
			s: '',
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
						height: 66,
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
			          		backgroundColor: '#ddd',
			          		width: '2px'
			          	}}/>
			          	<h5 className="title" style={{
			          		color: '#fff',
			          		fontWeight: 500,
			          		marginTop: 16,
			          		marginLeft: 30,
			          		fontSize: 22
			          	}}>
			          		{this.props.title}
			          	</h5>
			          	<div style={{
			          		backgroundColor: '#4DD0E1',
			          		marginLeft: '30px',
			          		borderRadius: 5,
			          		position: 'relative'
			          	}}>
			          		<form onSubmit={(e) => {
			          			e.preventDefault();
			          			if (this.state.s !== "") {
			          				this.props.search(this.state.s);			          				
			          			}
			          		}}>
					          	<i style={{
					          		color: '#fff',
					          		marginLeft: '10px',
					          		    top: 13,
	    								position: 'absolute'
					          	}} className="material-icons">search</i>
					          	<TextField
					          		className="red-selected"
					          		type="text"
							    	hintText={<span style={{color: 'white'}}>Tìm kiếm</span>}
							    	inputStyle={{
							    		color: 'white',
							    		paddingBottom: 5
							    	}}
							    	textareaStyle={{
							    		paddingRight: 5
							    	}}
							    	underlineShow={false}
							    	style={{
							    		marginLeft: '40px',
							    		width: '76%'
							    	}}
							    	value={this.state.s}
							    	onChange={(e, v) => this.setState({s: v})}
							    	onFocus={e => {
							    		if (e.target.value !== "") {
							    			e.target.select();
							    		}
							    	}}
							    />
						    </form>
			          	</div>
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

import { search } from '../../actions/search';

export default connect(state => ({
	user: state.user,
	title: state.title
}), {
	logout, search
})(Navbar);