import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default function AddButton(props) {
	return (
		<FloatingActionButton style={{
			position: 'fixed',
			right: '40px',
			bottom: '40px',
			zIndex: 1
		}}
			backgroundColor="#00C853"
			onTouchTap={props.onTouchTap}
		>
			<ContentAdd />
		</FloatingActionButton>
	)
}