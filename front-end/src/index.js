import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/config';
import $ from 'jquery';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './style/style.css';

import Container from './components/Container';
import App from './components/App';
import Login from './components/Login';
import Signup from './components/Signup';
import Dash from './components/Dash';
import AddDish from './components/AddDish';
import UserInfo from './components/UserInfo';
import Favorite from './components/Favorite';
import Dishes from './components/Dishes';
import Edit from './components/Edit';
import Search from './components/Search';
import Detail from './components/Detail';
import Page404 from './components/Page404';
import Loading from './components/Loading';

const history = syncHistoryWithStore(hashHistory, store);
injectTapEventPlugin();

const r = document.getElementById('root');

ReactDOM.render(
	<MuiThemeProvider>
		<Loading/>
	</MuiThemeProvider>,
	r
);

function checkLogin(nextState, replace, callback) {
	const user = store.getState().user;
	if (!user) {
		replace('/login');
	}
	callback();
}

function checkAgent(nextState, replace, callback) {
	const user = store.getState().user;
	if (!user.isAgent) {
		replace('/');
	}
	callback();
}

function checkCustomer(nextState, replace, callback) {
	const user = store.getState().user;
	if (user.isAgent) {
		replace('/');
	}
	callback();
}

function render() {
	ReactDOM.render(
		<MuiThemeProvider>
		  	<Provider store={store}>
		  		<Router history={history}>
		  			<Route path="/" component={Container}>
			  			<Route path="" component={App} onEnter={checkLogin}>
			  				<IndexRoute component={Dash} />
			  				<Route path="add" component={AddDish} onEnter={checkAgent}/>
			  				<Route path="info" component={UserInfo} />
			  				<Route path="favorite" component={Favorite} onEnter={checkCustomer}/>
			  				<Route path="dishes" component={Dishes} onEnter={checkAgent}/>
			  				<Route path="edit/:id" component={Edit} onEnter={checkAgent}/>
			  				<Route path="search/:s" component={Search} />
			  				<Route path="detail/:id" component={Detail} />
			  			</Route>
			  			<Route path="login" component={Login} />
			  			<Route path="signup" component={Signup} />
			  			<Route path="*" component={Page404} />
		  			</Route>
		  		</Router>
			</Provider>
		</MuiThemeProvider>,
		r
	);
}

import { setUser } from './actions/user';

$.get('/user/info', data => {
	if (data.errorCode === 0) {
		store.dispatch(setUser(data.data));
	}
	render();
});