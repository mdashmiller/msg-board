import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import EditProfile from './EditProfile'
import EditAuth from './EditAuth'
import PropTypes from 'prop-types'

const EditHub = ({
	auth,
	mobileNavVisible,
	mobileNotesVisible
}) => {

	if (!auth.uid) return <Redirect to="/signin" />

	return (
		<div className="container">
			<EditProfile
				mobileNavVisible={mobileNavVisible}
				mobileNotesVisible={mobileNotesVisible}
			/>
			<EditAuth
				mobileNavVisible={mobileNavVisible}
				mobileNotesVisible={mobileNotesVisible}
			/>
		</div>
	)	
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth
	}
}

EditHub.propTypes = {
	auth: PropTypes.shape({
		apiKey: PropTypes.string,
		appName: PropTypes.string,
		authDomain:PropTypes.string,
		createdAt: PropTypes.string,
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
			uid: PropTypes.string,
		})),
		redirectEventId: PropTypes.string,
		stsTokenManager: PropTypes.shape({
			accessToken: PropTypes.string,
			apiKey: PropTypes.string,
			expirationTime: PropTypes.number,
			refreshToken: PropTypes.string
		}),
		uid: PropTypes.string
	}).isRequired,
	mobileNavVisible: PropTypes.bool.isRequired,
	mobileNotesVisible: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(EditHub)
