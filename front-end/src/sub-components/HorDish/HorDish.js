import React from 'react';
import './style.css';

function HorDish(props) {
	return (
		<div className="mdl-card mdl-shadow--2dp mdl-card--horizontal">
			<div className="mdl-card__media">
				<img style={{
					maxWidth: '200px',
					maxHeight: '200px'
				}} src={props.image} alt="Món ăn"/>
			</div>
			<div className="mdl-card__title">
				<h2 className="mdl-card__title-text">{props.title}</h2>
			</div>
			<div className="mdl-card__supporting-text">
				{props.content}
			</div>
			<div className="mdl-card__actions mdl-card--border">
				{props.actions}
			</div>
		</div>
	)
}

export default HorDish;