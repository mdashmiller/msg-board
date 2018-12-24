import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const Notifications = props => {
	const { notifications } = props
	
	return (
		<div className="section">
			<div className="card z-depth-0">
				<div className="card-content">
					<span className="card-title">Notifications</span>
					<ul className="notifications">
						{ notifications && notifications.map(item => {
							return (
								<li key={item.id}>
									<span className="purple-text">{item.user} </span>
									<span>{item.content}</span>
									<div className="grey-text note-date">{moment(item.time.toDate()).fromNow()}</div>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</div>
	)
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

export default Notifications
