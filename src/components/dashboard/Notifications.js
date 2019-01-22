import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import PropTypes from 'prop-types'

const Notifications = props => {
	const { notifications } = props
	
	return (
		<div className="section notifications-content">
			<h5 className="note-panel-title">Notifications</h5>
				{ notifications && notifications.map(item => {
					return (
						<div className="card note-card" key={item.id}>
							<div className="card-content">
								<span className="purple-text">{item.user} </span>
								<span>{item.content}</span>
								<div className="grey-text note-date">{moment(item.time.toDate()).fromNow()}</div>
							</div>
						</div>
					)
				})}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		notifications: state.firestore.ordered.notifications
	}
}

Notifications.propTypes = {
	notifications: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.string.isRequired,
		id: PropTypes.string,
		time: PropTypes.shape({
			nanoseconds: PropTypes.number.isRequired,
			seconds: PropTypes.number.isRequired
		}).isRequired,
		user: PropTypes.string.isRequired
	}))
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] }
	])
)(Notifications)
