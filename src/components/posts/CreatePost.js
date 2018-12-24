import React, { Component } from 'react'
import { createPost } from  '../../store/actions/postActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

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
		this.props.history.push('/')
	}

	render() {
		const { auth } = this.props

		if (!auth.uid) return <Redirect to="/signin" />

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

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createPost: post => dispatch(createPost(post))
	}
}

CreatePost.propTypes = {
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
			uid: PropTypes.string
		})),
		redirectEventId: PropTypes.string,
		stsTokenManager: PropTypes.shape({
			accessToken: PropTypes.string.isRequired,
			apiKey: PropTypes.string.isRequired,
			expirationTime: PropTypes.number.isRequired,
			refreshToken: PropTypes.string.isRequired
		}).isRequired,
		uid: PropTypes.string.isRequired
	}).isRequired,
	createPost: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
