import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const MobileSignedOutLinks = ({ showOrHideMenu }) => {
	return (
		<ul className="mobile-links">
			<li><NavLink to="/signup" onClick={showOrHideMenu}>Sign Up</NavLink></li>
			<li><NavLink to="/signin" onClick={showOrHideMenu}>Log In</NavLink></li>
		</ul>
	)
}

MobileSignedOutLinks.propTypes = {
	showOrHideMenu: PropTypes.func.isRequired
}

export default MobileSignedOutLinks
