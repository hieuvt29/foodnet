import React from 'react';
import { container as Info } from '../Info';

export default function Container(props) {
	return (
		<div>
			<Info />
			{props.children}
		</div>
	)
}