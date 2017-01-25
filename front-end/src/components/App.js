import React, { Component } from 'react';
import Navbar from './Navbar';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import DishItem from './DishItem';
import Paging from './Paging';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            dish: [{
                title: "Gà xào",
                description: "Món gà xào ngon",
                like: 12,
                dislike: 1,
                liked: true,
                disliked: false,
                img: "http://materializecss.com/images/sample-1.jpg",
                commentList: [{
                    user: {
                        username: 'hoangkien'
                    },
                    comment: 'Ngon'
                }]
            }]
        }
    }
    render() {
        return (
        	<div>
            	<Navbar/>
            	<div className="container">
            		<div className="DishList">
	            		{
                            this.state.dish.map((elem, index) => {
                                return (
                                    <DishItem key={'r' + index}
                                        title={elem.title}
                                        description={elem.description}
                                        like={elem.like}
                                        dislike={elem.dislike}
                                        disliked={elem.disliked}
                                        liked={elem.liked}
                                        img={elem.img}
                                        onLike={(e) => {console.log('LIKE')}}
                                        onDislike={(e) => {console.log('Dislike')}}
                                        commentList={elem.commentList}
                                        comment={(cmt) => console.log(cmt)}
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

export default App;
