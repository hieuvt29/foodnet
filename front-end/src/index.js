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
import Edit from './containers/Edit';
import Delete from './containers/Delete';

const history = syncHistoryWithStore(hashHistory, store);

const checkLogin = (nextState, replace, callback) => {
	const info = JSON.parse(localStorage.getItem('user'));
	if (!info) {
		replace('/login');
		callback();
	} else {
		callback();
	}
}

function NotFound() {
	return (
		<h1 style={{textAlign: 'center'}}>Not found</h1>
	)
}

ReactDOM.render(
  	<Provider store={store}>
  		<Router history={history}>
            <Route path="/" component={App}>
				<IndexRoute component={Dash} onEnter={checkLogin}/>
				<Route path="login" component={Login}/>
				<Route path="signup" component={Signup}/>
				<Route path="edit/:id" component={Edit}/>
				<Route path="delete/:id" component={Delete}/>
				<Route path="add" component={AddDish}/>
				<Route path="*" component={NotFound}/>
            </Route>
        </Router>
  	</Provider>,
  	document.getElementById('root')
);
