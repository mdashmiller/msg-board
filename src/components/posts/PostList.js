import React from 'react'
import PostSummary from './PostSummary'
import { Link } from 'react-router-dom'

const PostList = ({ posts }) =>
	<div className="post-list section">
		{
			posts && posts.map(post =>
				<Link to={'/post/' + post.id} key={post.id}>
					<PostSummary post={post} />
				</Link>
			)
		}
	</div>

export default PostList
