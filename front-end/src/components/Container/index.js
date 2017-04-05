import React from 'react';
import Info from '../Info';

export default props => {
	return (
		<div>
			<Info />
			{props.children}
		</div>
	)
}
