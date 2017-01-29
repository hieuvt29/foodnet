import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '../public/css/style.css';
import { Provider } from 'react-redux';
import store from './store/config';
import { Router, Route, browserHistory, hashHistory , IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Login from './containers/Login';
import Signup from './containers/Signup';

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  	<Provider store={store}>
  		<Router history={history}>
            <Route path="/">
				<IndexRoute component={App}/>
				<Route path="login" component={Login}/>
				<Route path="signup" component={Signup}/>
            </Route>
        </Router>
  	</Provider>,
  	document.getElementById('root')
);
