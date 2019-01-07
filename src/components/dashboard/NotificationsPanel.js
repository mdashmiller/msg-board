import React from 'react'
import Notifications from './Notifications'

const NotificationsPanel = () => {
	return (
		<div className="hide-on-large-only notifications-panel">
			<Notifications />
		</div>
	)
}

// class NotificationsPanel extends Component {

// 	state = {
// 		closeTapped: false
// 	}

// 	tapToClose = () =>
// 		// sets state to hide the notifications panel
// 		this.setState({ closeTapped: true })

// 	render() {
// 		const { closeTapped } = this.state

// 		return (
// 			<div className={`hide-on-large-only notifications-panel ${closeTapped ? 'hidden' : null}`}>
// 				<span onClick={this.tapToClose} className="white-text">CLOSE</span>
// 				<Notifications />
// 			</div>
// 		)
// 	}
// }

export default NotificationsPanel
