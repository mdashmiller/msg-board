import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

const PostDetails = props => {
	const { post, auth } = props
	
	if (!auth.uid) return <Redirect to="/signin" />

	if (post) {
		return (
			<div className="container section post-details">
				<div className="card z-depth-0">
					<div className="card-content">
						<span className="card-title">{post.title}</span>
						<p>{post.message}</p>
					</div>
					<div className="card-action grey lighten-4 grey-text">
						<div>Posted by {post.authorFirstName} {post.authorLastName}</div>
						<div>{ moment(post.createdAt.toDate()).calendar() }</div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className="container center">
				<p>Loading post...</p>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id
	const posts = state.firestore.data.posts
	const post = posts ? posts[id] : null
	return {
		post,
		auth: state.firebase.auth
	}
}

PostDetails.propTypes = {
	post: PropTypes.shape({
		authorFirstName: PropTypes.string.isRequired,
		authorId: PropTypes.string.isRequired,
		authorLastName: PropTypes.string.isRequired,
		createdAt: PropTypes.shape({
			nanoseconds: PropTypes.number.isRequired,
			seconds: PropTypes.number.isRequired
		}).isRequired,
		message: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}),
	auth: PropTypes.shape({
		apiKey: PropTypes.string.isRequired,
		appName: PropTypes.string.isRequired,
		authDomain: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		displayName: PropTypes.string,
		email: PropTypes.string,
		emailVerified: PropTypes.bool,
		isAnonymous: PropTypes.bool,
		isEmpty: PropTypes.bool,
		isLoaded: PropTypes.bool,
		lastLoginAt: PropTypes.string,
		phoneNumber: PropTypes.string,
		photoURL: PropTypes.string,
		providerData: PropTypes.arrayOf(PropTypes.shape({
			displayName: PropTypes.string,
			email: PropTypes.string,
			phoneNumber: PropTypes.string,
			photoURL: PropTypes.string,
			providerId: PropTypes.string,
			uid: PropTypes.string,
		})),
		redirectEventId: PropTypes.string,
		stsTokenManager: PropTypes.shape({
			accessToken: PropTypes.string.isRequired,
			apiKey: PropTypes.string.isRequired,
			expirationTime: PropTypes.number.isRequired,
			refreshToken: PropTypes.string.isRequired,
		}).isRequired,
		uid: PropTypes.string.isRequired,
	}).isRequired
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'posts' }
	])
)(PostDetails)
