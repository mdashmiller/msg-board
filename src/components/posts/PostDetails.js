import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const PostDetails = props => {
	const { post } = props

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
						<div>7th October, 11am</div>
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
		post
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'posts' }
	])
)(PostDetails)
