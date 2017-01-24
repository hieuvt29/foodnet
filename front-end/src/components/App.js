import React, { Component } from 'react';
import Navbar from './Navbar';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import DishItem from './DishItem';
import Paging from './Paging';

class App extends Component {
    render() {
        return (
        	<div>
            	<Navbar/>
            	<div className="container">
            		<div className="DishList">
	            		<DishItem 
	            			title="Card Title"
	            			description="I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."
	            			like={12}
	            			dislike={1}
	            			disliked={true}
	            			img="http://materializecss.com/images/sample-1.jpg"
	            			onLike={(e) => {console.log('LIKE')}}
	            		/>
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
