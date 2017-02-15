import React, { Component } from 'react';

class Loading extends Component {
	render() {
		return (
			this.props.doing ? (
				<div className="loadingContainer">
					<div className="loadingItem">
						<div className="preloader-wrapper big active">
					    	<div className="spinner-layer spinner-blue-only">
					      		<div className="circle-clipper left">
					        		<div className="circle"></div>
					      		</div>
						      	<div className="gap-patch">
						        	<div className="circle"></div>
						      	</div>
					      		<div className="circle-clipper right">
					        		<div className="circle"></div>
					      		</div>
					    	</div>
					  </div>
				  </div>
			  </div>
			) : null
		)
	}
}

export default Loading;