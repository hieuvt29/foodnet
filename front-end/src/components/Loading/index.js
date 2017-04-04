import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default function Loading(props) {
	return (
		<div style={{
			textAlign: 'center'
		}}>
			<CircularProgress size={80} thickness={5} />
		</div>
	)
}