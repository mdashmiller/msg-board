import React, { Component } from 'react'
import { createPost } from  '../../store/actions/postActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NotChars from '../../NotChars'
import PropTypes from 'prop-types'

class CreatePost extends Component {

	state = {
		title: '',
		message: '',
		key: '',
		field: '',
		titleChars: 0,
		messageChars: 0,
		freezeTitle: false,
		freezeMessage: false,
		formError: false,
		titleError: false,
		messageError: false,
		postError: null,
		submitClicked: false,
		mobileMenuVisible: false
	}

	// component methods

	handleKeyDown = e => {
		const {
			field,
			freezeTitle,
			freezeMessage
		} = this.state
		const key = e.key

		// determine field user is in
		if (field === 'title') {
			// if char limit for the field has been reached
			// and user tries to enter another char set
			// state to display an error message
			if (freezeTitle && !NotChars.list.includes(key)) {
				this.setState({ titleError: true })
			}
		// field is message
		} else {
			if (freezeMessage && !NotChars.list.includes(key)) {
				this.setState({ messageError: true })
			}
		}

		this.setState({ key })
	}

	handleChange = e => {
		const { key, freezeTitle, freezeMessage } = this.state
		const field = e.target.id
		const chars = e.target.value.length

		// determine which form field is being used
		if (field === 'title') {
			// if user attempts to paste-in something that exceeds the
			// title char limit only display what fits in the limit, freeze
			// the input and display the appropriate error message
			if (chars > 100) {
				const title = e.target.value
				const truncatedTitle = title.substring(0, 100)

				this.setState({
					freezeTitle: true,
					titleError: true,
					title: truncatedTitle,
					titleChars: 100
				})
			} else {
				// if char limit has not been exceeded or the user pushes
				// a key from the NotChars list (backspace, arrows, etc.)
				// take the user's input
				if (!freezeTitle || NotChars.list.includes(key)) {
					this.setState({
						title: e.target.value,
						titleChars: chars
					})
				}
			}
		} else {
			if (chars > 2000) {
				// if user attempts to paste-in something that exceeds
				// the message char limit only display what fits in
				// the limit, freeze the input and display
				// the appropriate error message
				const message = e.target.value
				const truncatedMessage = message.substring(0, 2000)
				
				this.setState({
					freezeMessage: true,
					messageError: true,
					message: truncatedMessage,
					messageChars: 2000
				})
			} else {
				// if char limit has not been exceeded or the user pushes
				// a key from the NotChars list (backspace, arrows, etc.)
				// take the user's input
				if (!freezeMessage || NotChars.list.includes(key)) {
					this.setState({
						message: e.target.value,
						messageChars: chars
					})
				}
			}
		}
	}
		
	handleFocus = e => {
		const field = e.target.id

		// sets the field currently in focus and clears
		// any error messages when user focuses
		// on a form field
		this.setState({
			field,
			formError: false,
			freezeTitle: false,
			freezeMessage: false,
			titleError: false,
			messageError: false,
			postError: null
		})
	}

	trackChars = field => {
		// set state to prohibit any input in
		// a form field that exceeds the
		// specified number of chars
		switch (field) {
			case 'title':
				this.state.titleChars >= 100 ? (
					this.setState({ freezeTitle: true })
				) : (
					this.setState({ freezeTitle: false })
				)
				break
			case 'message':
				this.state.messageChars >= 2000 ? (
					this.setState({ freezeMessage: true })
				) : (
					this.setState({ freezeMessage: false })
				)
				break
			default:
				return
		}
	}

	handleSubmit = e => {
		const { title, message } = this.state

		if (!title || !message) {
			// make sure user has filled in all 
			// the form fields
			this.setState({ formError: true })
		} else {
			// call action creator and tell component
			// a submission has been made
			this.props.createPost({
				title,
				message
			})
			
			this.setState({ submitClicked: true })
		}

		e.preventDefault()
	}

	submitSuccess = () =>
		// redirect user to dashboard
		// upon successful post
		this.props.history.push('/')

	handleClick = e => {
		const { mobileMenuVisible } = this.state

		// if a mobile menu is open, still allow
		// click events so a click outside the 
		// menu will close it, but disable
		// the form so unintentional
		// submit events won't occur
		if (mobileMenuVisible) {
			e.preventDefault()
			this.setState({ mobileMenuVisible: false })
		}
	}

	// lifecycle hooks

	componentDidUpdate(prevProps, prevState) {
		const {
			titleChars,
			messageChars,
			field,
			postError
		} = this.state
		const {
			mobileNavVisible,
			mobileNotesVisible,
			fsSuccess,
			fsError
		} = this.props

		// if user has entered or deleted anything in the
		// form call trackChars() and tell it which field
		// has changed
		if (prevState.titleChars !== titleChars) {
			this.trackChars('title')
		} else if (prevState.messageChars !== messageChars) {
			this.trackChars('message')
		}

		// clear an existing field error if user deletes a
		// char from that field or focuses away from it
		if (prevState.titleError) {
			if (titleChars < 100 || field !== 'title') {
				this.setState({
					titleError: false
				})
			}
		} else if (prevState.messageError) {
			if (messageChars < 2000 || field !== 'message') {
				this.setState({
					messageError: false
				})
			}
		}

		// if there is a new fsError set it in state
		if (fsError !== prevProps.fsError) {
			this.setState({
				postError: fsError,
				submitClicked: false
			})
		}

		// if postError in state is null and the component receives a
		// a different fsError than before or a new occurance 
		// of the same fsError set it in state
		if (!postError
			&& fsError
			&& fsError !== prevProps.fsError) {
				this.setState({
					postError: fsError,
					submitClicked: false
				})
		}

		// if fsSuccess has just changed to true call
		// submitSuccess()
		if (fsSuccess && fsSuccess !== prevProps.fsSuccess) {
			this.submitSuccess()
		}

		// any time a mobile menu opens
		// track its status in state
		if (mobileNavVisible || mobileNotesVisible) {
			if (prevProps.mobileNavVisible !== mobileNavVisible
				|| prevProps.mobileNotesVisible !== mobileNotesVisible) {
					this.setState({ mobileMenuVisible: true })
			}
		}
	}

	render() {
		const {
			title,
			message,
			formError,
			titleError,
			messageError,
			submitClicked,
			postError
		} = this.state
		const {
			auth,
			mobileNavVisible,
			mobileNotesVisible
		} = this.props

		// conditional classNames to darken and
		// disable components
		const darken = submitClicked ? 'darken' : null
		const darkenForm = mobileNavVisible || mobileNotesVisible ? 'darken-form' : null
		const darkenButton = mobileNavVisible || mobileNotesVisible ? 'darken-button' : null

		if (!auth.uid) return <Redirect to="/signin" />
		
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className={darkenForm}>
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
						<button
							className={`btn z-depth-0 ${darken} ${darkenButton}`}
							onClick={this.handleClick}
						>
							post
						</button>
						<div className="red-text center">
							{ titleError && <p>Title cannot exceed 100 characters</p> }
							{ messageError && <p>Message cannot exceed 2000 characters</p>}
							{ formError && <p>Please complete all fields</p> }
							{ postError && <p>{ postError.message }</p>}
						</div>
						<div className="center">
							{ (submitClicked && !postError) ? (
									<div className="loading-msg">
										<i className="fas fa-spinner fa-spin"></i>
										<span>        Posting up...</span>
									</div>
								) : (
									null
								)
							}
						</div>
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		fsSuccess: state.post.postSuccess,
		fsError: state.post.postError
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
	history: PropTypes.shape({
		action: PropTypes.string,
		block: PropTypes.func,
		createHref: PropTypes.func,
		go: PropTypes.func,
		goBack: PropTypes.func,
		goForward: PropTypes.func,
		length: PropTypes.number,
		listen: PropTypes.func,
		location: PropTypes.shape({
			pathname: PropTypes.string,
			search: PropTypes.string,
			hash: PropTypes.string,
			state: PropTypes.string, // not certain
			key: PropTypes.string
		}),
		push: PropTypes.func.isRequired,
		replace: PropTypes.func
	}).isRequired,
	fsError: PropTypes.shape({
		code: PropTypes.string,
		message: PropTypes.string.isRequired
	}),
	fsSuccess: PropTypes.shape({
		field: PropTypes.string,
		formError: PropTypes.bool,
		freezeMessage: PropTypes.bool,
		freezeTitle: PropTypes.bool,
		key: PropTypes.string,
		message: PropTypes.string,
		messageChars: PropTypes.number,
		messageError: PropTypes.bool,
		mobileMenuVisible: PropTypes.bool,
		postError: PropTypes.shape({
			code: PropTypes.string,
			message: PropTypes.string
		}),
		submitClicked: PropTypes.bool,
		title: PropTypes.string,
		titleChars: PropTypes.number,
		titleError: PropTypes.bool
	}),
	mobileNavVisible: PropTypes.bool.isRequired,
	mobileNotesVisible: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
