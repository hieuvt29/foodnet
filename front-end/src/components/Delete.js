import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import DishItem from './DishItem';
import $ from 'jquery';

class Delete extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		$.get('/dishes/' + this.props.params.id, (data) => {
			if (data.errorCode !== 0) {
			 	return hashHistory.push('/');
			}
			this.setState(data.data);
		});
	}

	render() {
		const elem = this.state;
		return (
			<div className="DishList">
				<div style={{textAlign: "center"}}><h3>Xóa?</h3></div>
			  	{elem._id ? (
			  		<div>
						<DishItem key={elem._id}
		                    id={elem._id}
		                    agent={false}
		                    title={elem.name}
		                    description={elem.info}
		                    like={elem.likes.count}
		                    dislike={elem.dislikes.count}
		                    disliked={elem.disliked}
		                    liked={elem.liked}
		                    img={elem.img}
		                    onLike={(e) => {
		                        this.like(elem._id);
		                    }}
		                    onDislike={(e) => {
		                        this.dislike(elem._id);
		                    }}
		                    commentList={elem.reviews.reverse()}
		                    comment={(cmt) => {
		                        this.comment(elem._id, cmt);
		                    }}
		                    notShowActions={true}
		                />
		                <div style={{paddingBottom: '50px'}}>
		                	<span style={{fontSize: '25px', display: 'block'}}>Bạn có muốn xóa không?</span>
		                	<button className={"waves-effect waves-light btn red lighten-1" + (this.props.doing ? " disabled" : "")}
		                		onClick={() => this.props.deleteDish(elem._id)}>{this.props.doing ? "Đang xóa" : "Có"}</button>
		                	<Link to="/" style={{marginLeft: '5px'}} className="waves-effect waves-light btn green lighten-1">Không</Link>
		                </div>
	                </div>
                ) : null}
			</div>
		)
	}
}

export default Delete;