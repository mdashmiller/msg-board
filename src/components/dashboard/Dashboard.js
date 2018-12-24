import React, { Component } from 'react'
import Notifications from './Notifications'
import PostList from '../posts/PostList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class Dashboard extends Component {
	render() {
		const { posts, auth, notifications } = this.props

		if (!auth.uid) return <Redirect to="/signin" />
			
		return (
			<div className="dashboard container">
				<div className="row">
					<div className="col s12 m6">
						<PostList posts={posts} />
					</div>
					<div className="col s12 m5 offset-m1">
						<Notifications notifications={notifications} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		posts: state.firestore.ordered.posts,
		auth: state.firebase.auth,
		notifications: state.firestore.ordered.notifications
	}
}

Dashboard.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		authorFirstName: PropTypes.string.isRequired,
		authorId: PropTypes.string,
		authorLastName: PropTypes.string.isRequired,
		createdAt: PropTypes.shape({
			nanoseconds: PropTypes.number.isRequired,
			seconds: PropTypes.number.isRequired
		}).isRequired,
		message: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	})),
	auth: PropTypes.shape({
		isEmpty: PropTypes.bool.isRequired,
		isLoaded: PropTypes.bool.isRequired
	}).isRequired,
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
		{ collection: 'posts', orderBy: ['createdAt', 'desc'] },
		{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
	])
)(Dashboard)
