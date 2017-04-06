import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../actions/title';
import Loading from '../Loading';
import HorDish from '../HorDish';
import RaisedButton from 'material-ui/RaisedButton';

class Search extends Component {
	componentDidMount() {
		this.props.setTitle('Tìm kiếm');
		if (this.props.params.s !== this.props.query) {
			this.props.search(this.props.params.s);
		}
	}
	details(id) {
		this.props.push(`/detail/${id}`);
	}
	render() {
		const { dishes, loading, query } = this.props;
		return (
			<div style={{
				margin: '5px 15px'
			}}>
				<h5 style={{
					textAlign: 'center'
				}}>
					<span style={{
						fontWeight: 300
					}}>Kết quả tìm kiếm cho</span> {query}
				</h5>
				{loading && <Loading />}
				{!loading && (dishes.length === 0 ?
				<div>Không tìm thấy kết quả nào.</div> :
				dishes.map(d => (
					<HorDish key={d._id} content={d.info} 
						title={d.name} image={d.img}
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
				)))}
			</div>
		)
	}
}

import { push } from 'react-router-redux';
import { search } from '../../actions/search';

export default connect(state => ({
	dishes: state.search.dishes,
	query: state.search.query,
	loading: state.search.loading
}), {
	setTitle, push, search
})(Search);