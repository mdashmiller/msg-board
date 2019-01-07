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
		const { posts, auth } = this.props

		if (!auth.uid) return <Redirect to="/signin" />
			
		return (
			<div className="dashboard container">
				<div className="row">
					<div className="col s12 l6">
						<PostList posts={posts} />
					</div>
					{/* desktop notifications */}
					<div className="col l5 offset-l1 hide-on-med-and-down">
						<Notifications />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		posts: state.firestore.ordered.posts,
		auth: state.firebase.auth
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
	}).isRequired
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'posts', orderBy: ['createdAt', 'desc'] },
		{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
	])
)(Dashboard)
