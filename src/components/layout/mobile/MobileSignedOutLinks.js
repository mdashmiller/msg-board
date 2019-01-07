import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const MobileSignedOutLinks = ({ toggleMobileNav }) => {
	return (
		<ul className="mobile-links">
			<li><NavLink to="/signup" onClick={toggleMobileNav}>Sign Up</NavLink></li>
			<li><NavLink to="/signin" onClick={toggleMobileNav}>Log In</NavLink></li>
		</ul>
	)
}

MobileSignedOutLinks.propTypes = {
	toggleMobileNav: PropTypes.func.isRequired
}

export default MobileSignedOutLinks
