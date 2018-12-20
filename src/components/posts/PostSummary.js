import React from 'react'

const PostSummary = ({ post }) => {
	return (
		<div className="card z-depth-0 post-summary">
			<div className="card-content grey-text text-darken-3">
				<span className="card-title">{post.title}</span>
				<p>Posted by { post.authorFirstName } { post.authorLastName }</p>
				<p className="grey-text">7th October, 11am</p>
			</div>
		</div>
	)
}

export default PostSummary
