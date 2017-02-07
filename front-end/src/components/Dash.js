import React, { Component } from 'react';
import DishItem from './DishItem';
import Paging from './Paging';
import $ from 'jquery';
import { Link } from 'react-router';

class Dash extends Component {
    constructor (props) {
        super(props);
        this.state = {
            dish: [],
            info: this.props.info
        }
        this.user = JSON.parse(localStorage.getItem('user'));
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.comment = this.comment.bind(this);

        if (this.user.isAgent) {
            $.get('/user/dishes', (data) => {
                this.setState({
                    dish: data.data,
                    isAgent: true
                });
            });
        } else {
            $.get('/latest-dishes', (data) => {
                if (data.errorCode === 0) {
                    this.setState({
                        dish: data.data,
                        isAgent: false
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
        for (let i = 0; i < this.state.dish.length; i++) {
            if (this.state.dish[i]._id === id) {
               let nDish = {...this.state.dish};
               //nDish.
            }
        }
        $.post('/agent/dish/comment', {
            id: id,
            comment: comment
        }, (data) => {
            console.log(data);
        });
    }

    render() {
        let showAgent = this.user.isAgent;
        return (
            <div>
            	<div className="container">
            		<div className="DishList">
	            		{
                            (this.state.dish ? this.state.dish : []).map((elem, index) => {
                                return (
                                    <DishItem key={elem._id}
                                        id={elem._id}
                                        agent={showAgent}
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
                                    />
                                )
                            })
                        }
            		</div>
                    {
                        showAgent ? (
                            <div className="fixed">
                                <Link to="/add" className="btn-floating btn-large green">
                                    <i className="material-icons">add</i>
                                </Link>
                            </div>
                        ) : null
                    }
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
