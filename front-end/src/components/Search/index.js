import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../actions/title';
import Loading from '../Loading';
import HorDish from '../../sub-components/HorDish';
import RaisedButton from 'material-ui/RaisedButton';
import { hashHistory } from 'react-router';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			data: []
		}
	}
	componentDidMount() {
		this.props.setTitle('Tìm kiếm');
		setTimeout(() => {
			this.setState({
				loading: false,
				data: [{
					_id: '58bffef2e5cab61ac8fb9215',
					title: 'Pha mắm tôm ngon',
					image: 'http://afamilycdn.com/2017/mamtom-1-1488959679795.jpg',
					content: 'cách pha mắm tôm'
				},{
					_id: '58bffdbfe5cab61ac8fb9214',
					title: 'Cá kho',
					image: 'http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/quizzes/food_safety_quiz/650x350_food_safety_quiz.jpg',
					content: 'Cá kho thơm ngon, gia vị đậm đà'
				},{
					_id: '58bffd96e5cab61ac8fb9213',
					title: 'Thịt kho tàu',
					image: 'http://anh.eva.vn/upload/1-2015/images/2015-01-17/1421482918-thit-kho-tau-1.jpg',
					content: 'Ngày Tết gia đình thường có khách, chuẩn bị sẵn nồi thịt kho tàu thì chẳng bao giờ lo thiếu món đãi bạn bè. Cách làm thịt kho tàu không khó nhé!'
				}]
			});
		}, 2000);
	}
	details(id) {
		hashHistory.push(`/detail/${id}`);
	}
	render() {
		return (
			<div style={{
				margin: '5px 15px'
			}}>
				<h5 style={{
					textAlign: 'center'
				}}>
					<span style={{
						fontWeight: 300
					}}>Kết quả tìm kiếm cho</span> {this.props.params.s}
				</h5>
				{this.state.loading && <Loading />}
				{this.state.data.map(d => (
					<HorDish key={d._id} content={d.content} 
						title={d.title} image={d.image}
						actions={
							<div>
								<RaisedButton 
									label="Xem chi tiết" 
									primary={true}
									icon={<i style={{color: '#fff'}} className="material-icons">remove_red_eye</i>}
									onTouchTap={() => {
										this.details(d._id);
									}}
								/>
							</div>
						}
					/>
				))}
			</div>
		)
	}
}

export default connect(state => ({

}), {
	setTitle
})(Search);