import React, { Component } from 'react'
import PostSummary from './PostSummary'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class PostList extends Component {

	state = {
		// track whether any mobile menus are
		// open to disable links
		menuVisible: false
	}

	handleClick = e => {
		const { menuVisible } = this.state

		// if a mobile menu is open, still allow
		// click events so a click outside the 
		// menu will close it, but disable
		// the Links so a new view won't
		// be unintentionally rendered
		// if a Link is clicked-on
		if (menuVisible) {
			e.preventDefault()
			this.setState({ menuVisible: false })
		}
	}
	
	componentDidUpdate(prevProps) {
		const {
			mobileNavVisible,
			mobileNotesVisible
		} = this.props

		// any time a mobile menu opens
		// track its status in state
		if (mobileNavVisible || mobileNotesVisible) {
			if (prevProps.mobileNavVisible !== mobileNavVisible
				|| prevProps.mobileNotesVisible !== mobileNotesVisible) {
					this.setState({ menuVisible: true })
			}
		}
	}

	render() {
		const {
			posts, 
			mobileNavVisible,
			mobileNotesVisible
		} = this.props

		return (
			<div className="post-list section">
				{ posts && posts.map(post => {
					// check to see if it is a new member welcome post
					// and create a custom class with this info
					const welcome = (post.authorId === 'PostIt!') ? 'welcome' : null

					return (
						<Link 
							to={'/post/' + post.id}
							key={post.id}
							onClick={() => this.handleClick}
						>
							<PostSummary
								post={post} 
								mobileNavVisible={mobileNavVisible}
								mobileNotesVisible={mobileNotesVisible}
								welcome={welcome}
							/>
						</Link>
					)
				})}
			</div>
		)
	}
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
	})),
	mobileNavVisible: PropTypes.bool.isRequired,
	mobileNotesVisible: PropTypes.bool.isRequired
}

export default PostList
