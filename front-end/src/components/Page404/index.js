import React, { Component } from 'react';
import { Link } from 'react-router';
export default class Page404 extends Component {
	render() {
		return (
			<div style={{
				textAlign: 'center'
			}}>
				<div>
					<img src="/static/img/404.jpg" alt="404 Not found" />
				</div>
				<div>
					<Link to="/" style={{
						fontSize: 30
					}}>Về nhà</Link>
				</div>
			</div>
		)
	}
}