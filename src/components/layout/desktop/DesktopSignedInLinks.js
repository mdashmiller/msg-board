import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../../store/actions/authActions'
import PropTypes from 'prop-types'

const DesktopSignedInLinks = props => {
	return (
		<ul>
			<li><NavLink to="/create">New Post</NavLink></li>
			<li><NavLink to="/signin" onClick={props.signOut}>Log Out</NavLink></li>
			<li><NavLink to="/edit" className="btn btn-floating purple lighten-1">
				{ props.profile.initials }
			</NavLink></li>
		</ul>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		signOut: () => dispatch(signOut())
	}
}

DesktopSignedInLinks.propTypes = {
	profile: PropTypes.shape({
		firstName: PropTypes.string,
		initials: PropTypes.string,
		isEmpty: PropTypes.bool,
		isLoaded: PropTypes.bool,
		lastName: PropTypes.string
	}).isRequired,
	signOut: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(DesktopSignedInLinks)
