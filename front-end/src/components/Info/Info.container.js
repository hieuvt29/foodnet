import { connect } from 'react-redux';
import Info from './Info.component';
import { showInfo, closeInfo } from './Info.action';

export default connect(state => ({
	value: state.info
}), {
	showInfo, closeInfo
})(Info);