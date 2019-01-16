import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const PostSummary = ({ post, mobileNotesVisible }) => {
	return (
		<div className="card post-summary">
			<div className={`card-content grey-text text-darken-3 ${mobileNotesVisible ? 'darken' : null}`}>
				<span className="card-title">{post.title}</span>
				<p>Posted by { post.authorFirstName } { post.authorLastName }</p>
				<p className="grey-text">{ moment(post.createdAt.toDate()).calendar() }</p>
			</div>
		</div>
	)
}

PostSummary.propTypes = {
	post: PropTypes.shape({
		authorFirstName: PropTypes.string.isRequired,
		authorId: PropTypes.string,
		authorLastName: PropTypes.string.isRequired,
		createdAt: PropTypes.shape({
			nanoseconds: PropTypes.number.isRequired,
			seconds: PropTypes.number.isRequired
		}).isRequired,
		id: PropTypes.string,
		message: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	}).isRequired,
	mobileNotesVisible: PropTypes.bool.isRequired
}

export default PostSummary
