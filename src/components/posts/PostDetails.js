import React from 'react'

const PostDetails = props => {
	const id = props.match.params.id

	return (
		<div className="container section post-details">
			<div className="card z-depth-0">
				<div className="card-content">
					<span className="card-title">Post Title - {id}</span>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga odit eaque, corporis vero tempore.</p>
				</div>
				<div className="card-action grey lighten-4 grey-text">
					<div>Posted by Robo Robo</div>
					<div>7th October, 11am</div>
				</div>
			</div>
		</div>
	)
}

export default PostDetails
