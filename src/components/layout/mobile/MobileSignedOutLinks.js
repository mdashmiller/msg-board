import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const MobileSignedOutLinks = ({ toggleMenu }) => {
	return (
		<ul className="mobile-links">
			<li><NavLink to="/signup" onClick={() => toggleMenu('nav')}>Sign Up</NavLink></li>
			<li><NavLink to="/signin" onClick={() => toggleMenu('nav')}>Log In</NavLink></li>
		</ul>
	)
}

MobileSignedOutLinks.propTypes = {
	toggleMenu: PropTypes.func.isRequired
}

export default MobileSignedOutLinks
