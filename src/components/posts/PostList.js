import React from 'react'
import PostSummary from './PostSummary'

const PostList = ({ posts }) =>
	<div className="post-list section">
		{
			posts && posts.map(post =>
				<PostSummary post={post} key={post.id} />
			)
		}
	</div>

export default PostList
