import React, { Component } from 'react';
import { Link } from 'react-router';

class DishItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openCmt: false,
			comment: ''
		};
	}
	render() {
		return (
			<div className="col s12 m7 z-depth-5">
		  		<div className="card">
		    		<div className="card-image">
		      			<img src={this.props.img} alt="Food"/>
		      			<span className="card-title shadow">{this.props.title}</span>
		    		</div>
		    		<div className="card-content">
		      			<p>{this.props.description}</p>
		    		</div>
			    	<div className="card-action">
			      		<a style={ this.props.liked ? {color: '#42a5f5'} : {color: '#9e9e9e'}} href="#" onClick={(e) => {
			      			e.preventDefault();
			      			this.props.onLike();
			      		}}>
			      			<i style={{verticalAlign: 'middle'}} className="material-icons">thumb_up</i>
		      				<span style={{verticalAlign: 'middle', fontSize: '13px'}}>{" " + this.props.like}</span>
			      		</a>
			      		<a style={ this.props.disliked ? {color: "#ff5252"} : {color: '#9e9e9e'}} href="#" onClick={(e) => {
		      				e.preventDefault();
		      				this.props.onDislike();
		      			}}>
		      				<i style={{verticalAlign: 'middle'}} className="material-icons">thumb_down</i>
		      				<span style={{verticalAlign: 'middle', fontSize: '13px'}}>{" " + this.props.dislike}</span>
		      			</a>
		      			<a style={{color: '#9e9e9e'}} href="#" onClick={(e) => {
		      				e.preventDefault();
		      				this.setState({
		      					openCmt: !this.state.openCmt
		      				});
		      			}}>
		      				<i style={{verticalAlign: 'middle'}} className="material-icons">comment</i>
		      			</a>
		      			{
		      				this.props.agent ? (
		      					<span>
			      					<Link to={"/edit/" + this.props.id} 
			      						className="btn-floating btn-large waves-effect waves-light  amber darken-4"
			      						style={{marginRight: '5px'}}>
					      				<i className="material-icons">mode_edit</i>
					      			</Link>
					      			<Link to={"/delete/" + this.props.id} 
					      				className="btn-floating btn-large waves-effect waves-light red lighten-1">
					      				<i className="material-icons">delete_forever</i>
					      			</Link>
				      			</span>
		      				) : null
		      			}
			    	</div>
			    	{
			    		this.state.openCmt ? (
			    			<div className="card-comment">
					    		<form onSubmit={(e) => {
					    			e.preventDefault();
					    			this.props.comment(this.state.comment);
					    			this.setState({
					    				comment: ""
					    			});
					    		}}>
							        <div style={{marginTop: "0"}} className="input-field">
							          	<input autoFocus ref={(input) => {this.input = input; }} type="text" className="validate" 
							          		value={this.state.comment}
							          		onChange={(e) => this.setState({
							          			comment: e.target.value
							          		})}/>
							          	<label>Bình luận</label>
							        </div>
					    		</form>
					    		<div>
					    			<ul>
					    				{
					    					this.props.commentList.map((elem, index) => {
					    						return (
					    							<li key={index}>
					    								<a href="#">
					    									<span className="comment-user">{elem.user ? elem.user.username : "NULL"}</span>
					    								</a>
					    								{elem.comment}
					    							</li>
					    						)
					    					})
					    				}
					    			</ul>
					    		</div>
					    	</div>
			    		) : null
			    	}
			  	</div>
			</div>
		)
	}
}

export default DishItem;