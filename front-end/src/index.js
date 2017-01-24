import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '../public/css/style.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import store from './store/config';

injectTapEventPlugin();
ReactDOM.render(
  	<Provider store={store}>
  		<App />
  	</Provider>,
  	document.getElementById('root')
);
