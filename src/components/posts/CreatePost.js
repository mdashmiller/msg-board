import React, { Component } from 'react'
import { createPost } from  '../../store/actions/postActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class CreatePost extends Component {

	state = {
		title: '',
		message: '',
		key: '',
		titleChars: 0,
		messageChars: 0,
		freezeTitle: false,
		freezeMessage: false,
		formError: false
	}

	// component methods

	handleKeyDown = e => {
		const key = e.key
		this.setState({ key })
	}

	handleChange = e => {
		const { key, freezeTitle, freezeMessage } = this.state
		const field = e.target.id

		// if form field is below char limit or if user
		// deletes a char set state appropriately
		if (field === 'title') {
			if (!freezeTitle || key === 'Backspace') {
				this.setState({
					title: e.target.value,
					titleChars: e.target.value.length
				})
			}
		} else {
			if (!freezeMessage || key === 'Backspace') {
				this.setState({
					message: e.target.value,
					messageChars: e.target.value.length
				})
			}
		}
	}
		
	handleSubmit = e => {
		const { title, message } = this.state

		if (!title || !message) {
			// make sure user has filled in all 
			// the form fields
			this.setState({ formError: true })
		} else {
			// call action creator and take user
			// to dashboard
			this.props.createPost(this.state)
			this.props.history.push('/')
		}

		e.preventDefault()
	}

	handleFocus = () => {
		// clears formError message when user
		// focuses on a form field again
		this.setState({ formError: false })
	}

	trackChars = field => {
		// set state to prohibit any input in
		// a form field that exceeds the
		// specified number of chars
		switch (field) {
			case 'title':
				this.state.titleChars === 100 ? (
					this.setState({ freezeTitle: true })
				) : (
					this.setState({ freezeTitle: false })
				)
				break
			case 'message':
				this.state.messageChars === 2000 ? (
					this.setState({ freezeMessage: true })
				) : (
					this.setState({ freezeMessage: false })
				)
				break
			default:
				return
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// if user has entered or deleted anything in the
		// form call trackChars() and tell it which field
		// has changed
		if (prevState.titleChars !== this.state.titleChars) {
			this.trackChars('title')
		} else if (prevState.messageChars !== this.state.messageChars) {
			this.trackChars('message')
		}
	}

	render() {
		const { title, message, formError } = this.state
		const { auth, mobileNotesVisible } = this.props

		if (!auth.uid) return <Redirect to="/signin" />
		
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<h4>Create Post</h4>
					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input type="text" id="title" className="field"
							value={title}
							onKeyDown={this.handleKeyDown}
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="message">Message</label>
						<textarea id="message" className="materialize-textarea field"
							value={message}
							onKeyDown={this.handleKeyDown}
							onChange={this.handleChange}
							onFocus={this.handleFocus}
						>
						</textarea>
					</div>
					<div className="input-field">
						<button className={`btn z-depth-0 ${mobileNotesVisible ? 'darken' : null}`}>post</button>
						<div className="red-text center">
							{ formError && <p>Please complete all fields</p> }
						</div>
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
	createPost: PropTypes.func.isRequired,
	mobileNotesVisible: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
