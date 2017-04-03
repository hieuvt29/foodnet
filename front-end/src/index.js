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
import { container as App } from './components/App';
import { container as Login } from './components/Login';
import { container as Signup } from './components/Signup';
import { container as Dash } from './components/Dash';
import { container as AddDish } from './components/AddDish';
import { container as UserInfo } from './components/UserInfo';
import { container as Favorite } from './components/Favorite';

const history = syncHistoryWithStore(hashHistory, store);
injectTapEventPlugin();

const r = document.getElementById('root');

ReactDOM.render(
	<div>Loading</div>,
	r
);

function checkLogin(nextState, replace, callback) {
	const user = store.getState().user;
	console.log('Check');
	if (!user) {
		replace('/login');
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
			  				<Route path="add" component={AddDish} />
			  				<Route path="info" component={UserInfo} />
			  				<Route path="favorite" component={Favorite} />
			  			</Route>
			  			<Route path="login" component={Login} />
			  			<Route path="signup" component={Signup} />
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