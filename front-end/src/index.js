import React from 'react';
import ReactDOM from 'react-dom';
import Dash from './containers/Dash';
import '../public/css/style.css';
import { Provider } from 'react-redux';
import store from './store/config';
import { Router, Route, hashHistory , IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Login from './containers/Login';
import Signup from './containers/Signup';
import App from './containers/App';
import AddDish from './containers/AddDish';
import $ from 'jquery';
import { setInfo } from './actions/login';

const history = syncHistoryWithStore(hashHistory, store);
let lock = false;

const checkLogin = (nextState, replace, callback) => {
	const info = store.getState().login.info;
	if (!info && !lock) {
		lock = true;
		$.get('/user/info', (data) => {
			lock = false;
			if (data.errorCode === 0) {
				store.dispatch(setInfo(data.data));
				callback();
			} else {
				hashHistory.push('/login');
				callback();
			}
		});
	} else {
		callback();
	}
}

ReactDOM.render(
  	<Provider store={store}>
  		<Router history={history}>
            <Route path="/" component={App}>
				<IndexRoute component={Dash} onEnter={checkLogin}/>
				<Route path="login" component={Login}/>
				<Route path="signup" component={Signup}/>
				<Route path="add" component={AddDish}/>
            </Route>
        </Router>
  	</Provider>,
  	document.getElementById('root')
);
