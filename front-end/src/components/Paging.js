import React from 'react';

const Paging = (props) => {
	const arr = [];
	for (let i = 0; i < props.total; i++) {
		arr.push(i + 1);
	}
	return (
		<ul className="pagination" style={{textAlign: "center"}}>
		    <li className={props.total === 1 ? "disabled" : ""}>
		    	<a href="#" onClick={(e) => {
		    		e.preventDefault();
		    		props.prev();
		    	}}>
		    		<i className="material-icons">chevron_left</i>
		    	</a>
		    </li>
		    {
		    	arr.map((elem, index) => {
		    		return (
		    			<li key={index} className={props.current === elem ? "active" : "waves-effect"}>
		    				<a href="#" onClick={(e) => {
		    					e.preventDefault();
		    					props.go(elem);
		    				}}>{elem}</a>
		    			</li>
		    		);
		    	})
		    }
		    <li className="waves-effect">
		    	<a href="#" onClick={(e) => {
		    		e.preventDefault();
		    		props.next();
		    	}}>
		    		<i className="material-icons">chevron_right</i>
		    	</a>
		    </li>
  		</ul>
	)
}

export default Paging;