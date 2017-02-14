import React, { Component } from 'react';
import DishItem from './DishItem';
import Paging from './Paging';
import { Link } from 'react-router';

class Dash extends Component {
    constructor (props) {
        super(props);
        this.user = JSON.parse(localStorage.getItem('user'));
        this.props.loadDish();
    }
    render() {
        let showAgent = this.user.isAgent;
        return (
            <div>
            	<div className="container-fluid">
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
