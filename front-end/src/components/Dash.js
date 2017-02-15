import React, { Component } from 'react';
import DishItem from './DishItem';
import { Link } from 'react-router';
import $ from 'jquery';

class Dash extends Component {
    constructor (props) {
        super(props);
        this.user = JSON.parse(localStorage.getItem('user'));
        this.props.loadDish();
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (document.body.scrollTop > this.lastScroll) {
            const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            const body = document.body;
            const html = document.documentElement;
            const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            const windowBottom = windowHeight + window.pageYOffset;
            let value = docHeight;
            if (docHeight > 100) {
                value = docHeight - 100;
            }
            if (windowBottom >= value) {
                this.props.loadMore();
            }
        }
        this.lastScroll = document.body.scrollTop ;
    }

    render() {
        let showAgent = this.user.isAgent;
        return (
            <div>
        		<div className="columns">
            		{
                        (this.props.dishes : []).map((elem, index) => {
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
                                        this.props.likeDish(elem._id);
                                    }}
                                    onDislike={(e) => {
                                        this.props.dislikeDish(elem._id);
                                    }}
                                    commentList={[...elem.reviews].reverse()}
                                    comment={(cmt) => {
                                        this.props.commentDish(elem._id, cmt);
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
        		{
                    this.props.loading ? (
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Dash;
