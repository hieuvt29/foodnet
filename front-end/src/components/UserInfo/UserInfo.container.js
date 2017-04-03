import { connect } from 'react-redux';
import UserInfo from './UserInfo.component';
import { updateInfo, updatePassword } from './UserInfo.action'

export default connect(state => ({
	user: state.user
}), {
	updateInfo, updatePassword
})(UserInfo);