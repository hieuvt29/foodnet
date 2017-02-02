import React, { Component } from 'react';
import DishItem from './DishItem';
import Paging from './Paging';
import $ from 'jquery';

class Dash extends Component {
    constructor (props) {
        super(props);
        this.state = {
            dish: []
        }
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.comment = this.comment.bind(this);
        console.log(this.props);
        let info = this.props.info;
        let showAgent = info && info.isAgent;
        if (!showAgent) {
            $.get('/latest-dishes', (data) => {
                if (data.errorCode === 0) {
                    this.setState({
                        dish: data.data
                    });
                } else {
                    console.log('Failed to get dishes');
                }
            });
        }
    }

    like(id) {
        console.log('LIKE', id);
        $.post('/agent/dish/like', {
            id: id
        }, (data) => {
            console.log(data);
        });
    }

    dislike(id) {
        console.log('DISLIKE', id);
        $.post('/agent/dish/dislike', {
            id: id
        }, (data) => {
            console.log(data);
        });
    }

    comment(id, comment) {
        console.log('Comment', id, comment);
        $.post('/agent/dish/comment', {
            id: id,
            comment: comment
        }, (data) => {
            console.log(data);
        });
    }

    render() {
        let info = this.props.info;
        let showAgent = info && info.isAgent;
        return showAgent ? (
            <div>Agent</div>
        ) : (
        	<div>
            	<div className="container">
            		<div className="DishList">
	            		{
                            this.state.dish.map((elem, index) => {
                                return (
                                    <DishItem key={elem._id}
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
                                        commentList={elem.reviews}
                                        comment={(cmt) => {
                                            this.comment(elem._id, cmt);
                                        }}
                                    />
                                )
                            })
                        }
            		</div>
            		<Paging total={5} current={2} 
            			go={(page) => console.log('Go to page ' + page )}
            			next={() => console.log('Go to next page')}
            			prev={() => console.log('Go to previous page')}
            		/>
            	</div>
            </div>
        );
    }
}

export default Dash;
