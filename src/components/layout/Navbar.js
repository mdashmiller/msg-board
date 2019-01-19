import React from 'react'
import { Link } from 'react-router-dom'
import DesktopSignedInLinks from './desktop/DesktopSignedInLinks'
import DesktopSignedOutLinks from './desktop/DesktopSignedOutLinks'
import MobileSignedInLinks from './mobile/MobileSignedInLinks'
import MobileSignedOutLinks from './mobile/MobileSignedOutLinks'
import NotificationsPanel from '../dashboard/NotificationsPanel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const handleClick = (mobileNavVisible, toggleMenu) => {
	// if mobile nav is open, close it
	// when user clicks brand-logo
	mobileNavVisible && toggleMenu('nav')
}

const Navbar = ({
	auth,
	profile,
	mobileNavVisible,
	mobileNotesVisible,
	toggleMenu
}) => {

	// display a different set of links to authenticated
	// versus unauthenticated users
	const desktopLinks = auth.uid ? <DesktopSignedInLinks profile={profile} /> : <DesktopSignedOutLinks />
	const mobileLinks = auth.uid ? (
		<MobileSignedInLinks toggleMenu={toggleMenu} />
	) : (
		<MobileSignedOutLinks toggleMenu={toggleMenu} />
	) 

	// creating a conditional class to darken inactive
	// elements when the mobile notifications
	// panel is open
	const darken = mobileNotesVisible ? 'darken' : null

	return (
		<header>
			<nav className={`nav-wrapper grey darken-3 ${darken}`}>
				<div className="container">
					<Link
						to="/"
						className="brand-logo"
						onClick={() => handleClick(mobileNavVisible, toggleMenu)}
					>
						POST IT!
					</Link>		
					
					{/*desktop menu*/}
					<div className="right hide-on-med-and-down">
						{ desktopLinks }
					</div>
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
	}).isRequired,
	mobileNavVisible: PropTypes.bool.isRequired,
	mobileNotesVisible: PropTypes.bool.isRequired,
	toggleMenu: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Navbar)
