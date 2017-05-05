import React, { Component } from 'react';
import { TextField, MenuItem, IconButton, IconMenu, AppBar, Divider} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
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
	},
	icon: {
		color: '#fff'
	},
	title: {
		color: '#fff',
		fontWeight: '500',
		fontSize: 35,
		paddingLeft: 30,
		paddingRight: 20,
		fontFamily: "'Lobster', cursive"
	},
	subTitle:{
		color: '#fff',
		fontWeight: 500,
		marginLeft: 30,
		fontSize: 22
	},
	toolbar: {
		height: '100%'
	},
	searchWrapper: {
	    backgroundColor: '#4DD0E1',
	    margin: 10,
	    paddingLeft: 20,
	    paddingRight: 20,
	    borderRadius: 3,
	    flex: 1,
	    display: 'flex',
    	alignItems: 'center'
	},
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
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
	}

	handleSearchChange(e, s) {
		this.setState({s});
	}

	handleSearchSubmit(e) {
		e.preventDefault();
		if (this.state.s !== "") {
			this.props.search(this.state.s);
		}
	}

	render() {
		const {user, logout} = this.props;
		return (
			<AppBar
				style={{ flexDirection: 'row', position: 'fixed', top: 0, width: '100%' }}
				iconStyleRight={{ marginTop: 0 }}
				iconStyleLeft={{ marginTop: 0, flex: 1 }}
				titleStyle={{ display: 'none' }}
				iconElementLeft={
					<ToolbarGroup style={style.toolbar}>
						<Link to="/">
							<ToolbarTitle text="Foodnet" style={style.title} />
						</Link>
						<Divider style={{
							color: '#fff',
							height: 40,
							width: 2
						}}/>
						<ToolbarTitle text={this.props.title} style={style.subTitle}/>
						<form style={style.searchWrapper} onSubmit={this.handleSearchSubmit}>
							<i style={{color:'#fff'}} className="material-icons">search</i>
							<TextField
								underlineShow={false}
								inputStyle={{color: '#fff', paddingLeft: 10}}
								fullWidth={true}
								value={this.state.search}
								onChange={this.handleSearchChange}
								name="search"
								onFocus={e => {
									if (e.target.value) {
										e.target.select();
									}
								}}
							/>
						</form>
					</ToolbarGroup>
				}
				iconElementRight={
					<ToolbarGroup style={style.toolbar}>
						<Menu user={user} logout={logout}/>
					</ToolbarGroup>
				}
			/>
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