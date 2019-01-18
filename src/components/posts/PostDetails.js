import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

const PostDetails = props => {
	const {
		post,
		auth,
		mobileNavVisible,
		mobileNotesVisible
	} = props

	// creating a conditional class to darken inactive elements
	// when the mobile nav or notifications panel is open
	const darken = mobileNavVisible || mobileNotesVisible ? 'darken' : null
	
	if (!auth.uid) return <Redirect to="/signin" />

	if (post) {
		return (
			<div className="container section post-details">
				<div className="card">
					<div className={`card-content ${darken}`}>
						<span className="card-title">{post.title}</span>
						<p>{post.message}</p>
					</div>
				</div>

				<div className="card">
					<div
						className={`card-content grey-text text-darken-1 ${darken}`}
					>
						<p>Posted by {post.authorFirstName} {post.authorLastName}</p>
						<p>{ moment(post.createdAt.toDate()).calendar() }</p>
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
	}).isRequired,
	mobileNavVisible: PropTypes.bool.isRequired,
	mobileNotesVisible: PropTypes.bool.isRequired
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'posts' }
	])
)(PostDetails)
