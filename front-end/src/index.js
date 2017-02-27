import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/config';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './style/style.css';
import App from './components/App.js'
import { container as Login } from './components/authenticate/Login';

const history = syncHistoryWithStore(hashHistory, store);
injectTapEventPlugin();



ReactDOM.render(
	<MuiThemeProvider>
	  	<Provider store={store}>
	  		<Router history={history}>
	  			<Route path="/" component={App}>
	  				<Route path="login" component={Login} />
	  			</Route>
	  		</Router>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root')
);
