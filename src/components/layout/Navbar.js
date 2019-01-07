import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DesktopSignedInLinks from './desktop/DesktopSignedInLinks'
import DesktopSignedOutLinks from './desktop/DesktopSignedOutLinks'
import MobileSignedInLinks from './mobile/MobileSignedInLinks'
import MobileSignedOutLinks from './mobile/MobileSignedOutLinks'
import NotificationsPanel from '../dashboard/NotificationsPanel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Navbar extends Component {
	 
	state = {
	 	mobileNavVisible: false,
	 	mobileNotesVisible: false
	}

	// component methods

	toggleMobileNav = () =>
	 	// sets state to hide or show the
	 	// mobile drop-down nav
	 	this.setState(prevState => {
	 		const { mobileNavVisible } = prevState
	 		return {
	 			mobileNavVisible: !mobileNavVisible
	 		}
	 	})

	 toggleMobileNotes = () =>
	 	// sets state to hide or show the
	 	// mobile notifications panel
	 	this.setState(prevState => {
	 		const { mobileNotesVisible } = prevState
	 		return {
	 			mobileNotesVisible: !mobileNotesVisible
	 		}
	 	})

	render() {
		const { mobileNavVisible, mobileNotesVisible } = this.state
		const { auth, profile } = this.props
		// display a different set of links to authenticated
		// versus unauthenticated users
		const desktopLinks = auth.uid ? <DesktopSignedInLinks profile={profile} /> : <DesktopSignedOutLinks />
		const mobileLinks = auth.uid ? (
			<MobileSignedInLinks toggleMobileNav={this.toggleMobileNav} />
		) : (
			<MobileSignedOutLinks toggleMobileNav={this.toggleMobileNav} />
		) 

		return (
			<header>
				<nav className="nav-wrapper grey darken-3">
					<div className="container">
						<Link to="/" className="brand-logo">MessageBot</Link>
		
						{/*burger button*/}
						<button className="burger hide-on-large-only" onClick={this.toggleMobileNav}>
							<i className="material-icons">menu</i>
						</button>
						
						{/*desktop menu*/}
						<div className="right hide-on-med-and-down">
							{ desktopLinks }
						</div>

						{/*notifications trigger for logged-in mobile users*/}
						{ auth.uid &&
							<div className="right hide-on-large-only" onClick={this.toggleMobileNotes}>
								{mobileNotesVisible ? (
									<span className="mobile-notes-trigger">CLOSE</span>
								) : (
									<i className="mobile-notes-trigger material-icons right">notifications</i>
								)}
							</div>
						}
					</div>
				</nav>
		
				{/*mobile menu*/}
				<div
					className={`mobile-menu grey darken-3 ${!mobileNavVisible ? 'hidden' : null} ${auth.uid ? 'logged-in' : null}`}
				>
					{ mobileLinks }
				</div>

				{/* mobile notifications */}
				<div className={!mobileNotesVisible ? 'hidden' : null}>
					<NotificationsPanel />
				</div>
			</header>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

Navbar.propTypes = {
	auth: PropTypes.shape({
		isEmpty: PropTypes.bool.isRequired,
		isLoaded: PropTypes.bool.isRequired
	}).isRequired,
	profile: PropTypes.shape({
		isEmpty: PropTypes.bool.isRequired,
		isLoaded: PropTypes.bool.isRequired,
	}).isRequired
}

export default connect(mapStateToProps)(Navbar)
