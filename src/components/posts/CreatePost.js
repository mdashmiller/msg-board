import React, { Component } from 'react'
import { createPost } from  '../../store/actions/postActions'
import { connect } from 'react-redux'

class CreatePost extends Component {

	state = {
		title: '',
		message: ''
	}

	// component methods

	handleChange = e =>
		this.setState({
			[e.target.id]: e.target.value
		})

	handleSubmit = e => {
		e.preventDefault()
		this.props.createPost(this.state)
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Create Post</h5>
					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input type="text" id="title" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="message">Message</label>
						<textarea id="message" className="materialize-textarea" onChange={this.handleChange}></textarea>
					</div>
					<div className="input-field">
						<button className="btn purple lighten-1 z-depth-0">post</button>
					</div>
				</form>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createPost: post => dispatch(createPost(post))
	}
}

export default connect(null, mapDispatchToProps)(CreatePost)
