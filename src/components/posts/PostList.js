import React from 'react'
import PostSummary from './PostSummary'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PostList = ({ posts }) => {
	return (
		<div className="post-list section">
			{ posts && posts.map(post =>
				<Link to={'/post/' + post.id} key={post.id}>
					<PostSummary post={post} />
				</Link>
			)}
		</div>
	)
}

PostList.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.shape({
		authorFirstName: PropTypes.string.isRequired,
		authorId: PropTypes.string,
		authorLastName: PropTypes.string.isRequired,
		createdAt: PropTypes.shape({
			nanoseconds: PropTypes.number.isRequired,
			seconds: PropTypes.number.isRequired
		}).isRequired,
		id: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	}))
}

export default PostList
